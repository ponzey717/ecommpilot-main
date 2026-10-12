"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const accepted = ["image/jpeg", "image/png", "image/webp"];
const extension = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" } as const;

export function ImageResizer() {
  const [file, setFile] = useState<File | null>(null);
  const [before, setBefore] = useState("");
  const [after, setAfter] = useState("");
  const [blob, setBlob] = useState<Blob | null>(null);
  const [width, setWidth] = useState(1200);
  const [height, setHeight] = useState(1200);
  const [quality, setQuality] = useState(82);
  const [format, setFormat] = useState<keyof typeof extension>("image/jpeg");
  const [dimensions, setDimensions] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const beforeUrl = useRef("");
  const afterUrl = useRef("");

  useEffect(() => {
    return () => {
      if (beforeUrl.current) URL.revokeObjectURL(beforeUrl.current);
      if (afterUrl.current) URL.revokeObjectURL(afterUrl.current);
    };
  }, []);

  const invalidateOutput = () => {
    if (afterUrl.current) URL.revokeObjectURL(afterUrl.current);
    afterUrl.current = "";
    setAfter(""); setBlob(null); setDimensions("");
  };

  const select = (selected?: File) => {
    setError(""); setBlob(null); setAfter(""); setDimensions("");
    if (beforeUrl.current) URL.revokeObjectURL(beforeUrl.current);
    if (afterUrl.current) URL.revokeObjectURL(afterUrl.current);
    beforeUrl.current = ""; afterUrl.current = ""; setBefore("");
    if (!selected) { setFile(null); return; }
    if (!accepted.includes(selected.type)) { setError("Choose a JPEG, PNG or WebP image."); setFile(null); return; }
    if (selected.size > 20 * 1024 * 1024) { setError("Choose an image under 20 MB."); setFile(null); return; }
    beforeUrl.current = URL.createObjectURL(selected); setBefore(beforeUrl.current);
    setFile(selected);
  };
  const process = async () => {
    if (!file) return;
    if (!Number.isInteger(width) || !Number.isInteger(height) || width < 1 || height < 1 || width > 4000 || height > 4000) { setError("Enter whole-number dimensions from 1 to 4,000 pixels."); return; }
    setBusy(true); setError(""); setBlob(null);
    if (afterUrl.current) URL.revokeObjectURL(afterUrl.current);
    afterUrl.current = ""; setAfter("");
    let bitmap: ImageBitmap | null = null;
    try {
      bitmap = await createImageBitmap(file);
      if (bitmap.width * bitmap.height > 40_000_000) throw new Error("This image is too large to process safely in your browser (40 megapixel limit).");
      const scale = Math.min(1, width / bitmap.width, height / bitmap.height);
      const targetWidth = Math.max(1, Math.round(bitmap.width * scale));
      const targetHeight = Math.max(1, Math.round(bitmap.height * scale));
      const canvas = document.createElement("canvas");
      canvas.width = targetWidth; canvas.height = targetHeight;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Image processing is unavailable in this browser.");
      if (format === "image/jpeg") { context.fillStyle = "#ffffff"; context.fillRect(0, 0, targetWidth, targetHeight); }
      context.drawImage(bitmap, 0, 0, targetWidth, targetHeight);
      const output = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, format, quality / 100));
      if (!output || output.type !== format) throw new Error("This browser could not export the selected image format.");
      afterUrl.current = URL.createObjectURL(output); setAfter(afterUrl.current);
      setBlob(output); setDimensions(`${targetWidth} × ${targetHeight} px`);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not process this image."); }
    finally { bitmap?.close(); setBusy(false); }
  };

  return <div className="grid min-w-0 gap-6 lg:grid-cols-[1.1fr_.9fr]">
    <div className="feature-card min-w-0 space-y-5">
      <label className="grid gap-2 text-sm font-bold text-[var(--navy)]">Choose a local image<input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => select(event.target.files?.[0])} className="catalog-input max-w-full" /></label>
      <p className="text-xs text-[var(--muted)]">JPEG, PNG or WebP; up to 20 MB and 40 megapixels. Your image stays in this browser.</p>
      <div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-2 text-sm font-bold text-[var(--navy)]">Maximum width (px)<input className="catalog-input" type="number" min="1" max="4000" value={width} onChange={(event) => { invalidateOutput(); setWidth(Number(event.target.value)); }} /></label><label className="grid gap-2 text-sm font-bold text-[var(--navy)]">Maximum height (px)<input className="catalog-input" type="number" min="1" max="4000" value={height} onChange={(event) => { invalidateOutput(); setHeight(Number(event.target.value)); }} /></label></div>
      <p className="text-sm text-[var(--muted)]">Aspect ratio is preserved. Smaller images are not enlarged.</p>
      <div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-2 text-sm font-bold text-[var(--navy)]">Export format<select className="catalog-input" value={format} onChange={(event) => { invalidateOutput(); setFormat(event.target.value as keyof typeof extension); }}><option value="image/jpeg">JPEG</option><option value="image/png">PNG</option><option value="image/webp">WebP</option></select></label><label className="grid gap-2 text-sm font-bold text-[var(--navy)]">Quality: {quality}%<input type="range" min="30" max="100" value={quality} disabled={format === "image/png"} onChange={(event) => { invalidateOutput(); setQuality(Number(event.target.value)); }} /><span className="text-xs font-normal text-[var(--muted)]">PNG ignores the quality setting.</span></label></div>
      <button type="button" className="button button-primary" onClick={process} disabled={!file || busy}>{busy ? "Processing…" : "Resize image"}</button>
      {error ? <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p> : null}
    </div>
    <div className="snapshot-card min-w-0"><p className="eyebrow">Preview and download</p>{before ? <div className="mt-5 grid gap-4 sm:grid-cols-2"><figure className="min-w-0"><Image unoptimized src={before} width={400} height={176} alt="Original selected image preview" className="h-44 w-full rounded-xl bg-white object-contain" /><figcaption className="mt-2 text-xs text-[var(--muted)]">Before · {(file!.size / 1024).toFixed(0)} KB</figcaption></figure>{after && blob ? <figure className="min-w-0"><Image unoptimized src={after} width={400} height={176} alt="Resized image preview" className="h-44 w-full rounded-xl bg-white object-contain" /><figcaption className="mt-2 text-xs text-[var(--muted)]">After · {(blob.size / 1024).toFixed(0)} KB · {dimensions}</figcaption></figure> : null}</div> : <p className="mt-5 text-sm text-[var(--muted)]">Choose an image to begin.</p>}{blob && after ? <><p className="mt-4 text-sm text-[var(--muted)]">Size change: {Math.abs((1 - blob.size / file!.size) * 100).toFixed(0)}% {blob.size > file!.size ? "larger" : "smaller"} than the original.</p><a className="button button-cyan mt-5" href={after} download={`ebay-image.${extension[blob.type as keyof typeof extension]}`}>Download resized image</a></> : null}</div>
  </div>;
}
