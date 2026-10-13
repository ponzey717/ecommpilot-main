"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const accepted = ["image/jpeg", "image/png", "image/webp"];
const extension = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" } as const;
const fileSize = (bytes: number) => bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(2)} MB` : `${(bytes / 1024).toFixed(0)} KB`;

export function ImageResizer() {
  const [file, setFile] = useState<File | null>(null);
  const [before, setBefore] = useState("");
  const [after, setAfter] = useState("");
  const [blob, setBlob] = useState<Blob | null>(null);
  const [original, setOriginal] = useState({ width: 0, height: 0 });
  const [width, setWidth] = useState(1200);
  const [height, setHeight] = useState(1200);
  const [locked, setLocked] = useState(true);
  const [quality, setQuality] = useState(82);
  const [format, setFormat] = useState<keyof typeof extension>("image/jpeg");
  const [dimensions, setDimensions] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const beforeUrl = useRef("");
  const afterUrl = useRef("");

  useEffect(() => () => { if (beforeUrl.current) URL.revokeObjectURL(beforeUrl.current); if (afterUrl.current) URL.revokeObjectURL(afterUrl.current); }, []);
  const invalidateOutput = () => { if (afterUrl.current) URL.revokeObjectURL(afterUrl.current); afterUrl.current = ""; setAfter(""); setBlob(null); setDimensions(""); };
  const clear = () => { invalidateOutput(); if (beforeUrl.current) URL.revokeObjectURL(beforeUrl.current); beforeUrl.current = ""; setBefore(""); setFile(null); setOriginal({ width: 0, height: 0 }); setError(""); };
  const select = (selected?: File) => {
    clear();
    if (!selected) return;
    if (!accepted.includes(selected.type)) { setError("Choose a JPEG, PNG or WebP image."); return; }
    if (selected.size > 20 * 1024 * 1024) { setError("Choose an image under 20 MB."); return; }
    const url = URL.createObjectURL(selected);
    const preview = document.createElement("img");
    preview.onload = () => {
      if (preview.naturalWidth * preview.naturalHeight > 40_000_000) { URL.revokeObjectURL(url); setError("This image exceeds the safe 40 megapixel limit."); return; }
      beforeUrl.current = url; setBefore(url); setFile(selected);
      setOriginal({ width: preview.naturalWidth, height: preview.naturalHeight });
      const scale = Math.min(1, 1200 / preview.naturalWidth, 1200 / preview.naturalHeight);
      setWidth(Math.max(1, Math.round(preview.naturalWidth * scale))); setHeight(Math.max(1, Math.round(preview.naturalHeight * scale)));
    };
    preview.onerror = () => { URL.revokeObjectURL(url); setError("The selected image could not be read."); };
    preview.src = url;
  };
  const changeWidth = (next: number) => { invalidateOutput(); setWidth(next); if (locked && original.width) setHeight(Math.max(1, Math.round(next * original.height / original.width))); };
  const changeHeight = (next: number) => { invalidateOutput(); setHeight(next); if (locked && original.height) setWidth(Math.max(1, Math.round(next * original.width / original.height))); };
  const process = async () => {
    if (!file) return;
    if (!Number.isInteger(width) || !Number.isInteger(height) || width < 1 || height < 1 || width > 4000 || height > 4000) { setError("Enter whole-number dimensions from 1 to 4,000 pixels."); return; }
    setBusy(true); setError(""); invalidateOutput();
    let bitmap: ImageBitmap | null = null;
    try {
      bitmap = await createImageBitmap(file);
      const canvas = document.createElement("canvas"); canvas.width = width; canvas.height = height;
      const context = canvas.getContext("2d"); if (!context) throw new Error("Image processing is unavailable in this browser.");
      if (format === "image/jpeg") { context.fillStyle = "#ffffff"; context.fillRect(0, 0, width, height); }
      context.imageSmoothingEnabled = true; context.imageSmoothingQuality = "high"; context.drawImage(bitmap, 0, 0, width, height);
      const output = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, format, quality / 100));
      if (!output || output.type !== format) throw new Error("This browser could not export the selected format.");
      afterUrl.current = URL.createObjectURL(output); setAfter(afterUrl.current); setBlob(output); setDimensions(`${width} × ${height} px`);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not process this image."); }
    finally { bitmap?.close(); setBusy(false); }
  };

  return <div className="tool-workspace image-workspace">
    <section className="tool-input-panel">
      <div className="tool-panel-head"><div><p className="tool-panel-kicker">Local image</p><h2>Resize &amp; compress</h2><p>Your file never leaves this browser.</p></div></div>
      <label className="image-drop-zone" onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); select(event.dataTransfer.files[0]); }}>
        <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => select(event.target.files?.[0])} />
        <span aria-hidden="true">⇧</span><b>{file ? file.name : "Drop an image here"}</b><small>{file ? "Choose another image" : "or choose a JPEG, PNG or WebP · max 20 MB"}</small>
      </label>
      {file ? <><div className="tool-field-grid"><label className="tool-field"><span>Target width (px)</span><input className="tool-control" type="number" min="1" max="4000" value={width} onChange={(event) => changeWidth(Number(event.target.value))} /></label><label className="tool-field"><span>Target height (px)</span><input className="tool-control" type="number" min="1" max="4000" value={height} onChange={(event) => changeHeight(Number(event.target.value))} /></label><label className="tool-field"><span>Export format</span><select className="tool-control" value={format} onChange={(event) => { invalidateOutput(); setFormat(event.target.value as keyof typeof extension); }}><option value="image/jpeg">JPEG</option><option value="image/png">PNG</option><option value="image/webp">WebP</option></select></label><label className="tool-field"><span>Quality · {quality}%</span><input className="tool-range" type="range" min="30" max="100" value={quality} disabled={format === "image/png"} onChange={(event) => { invalidateOutput(); setQuality(Number(event.target.value)); }} /><small>{format === "image/png" ? "PNG export ignores quality." : "Lower quality usually creates a smaller file."}</small></label></div><label className="aspect-lock"><input type="checkbox" checked={locked} onChange={(event) => setLocked(event.target.checked)} /> Protect original aspect ratio</label></> : null}
      {error ? <div className="result-error" role="alert"><b>Could not process image</b><p>{error}</p></div> : null}
      <div className="tool-actions"><button type="button" className="button button-primary" onClick={process} disabled={!file || busy}>{busy ? "Processing…" : "Resize image"}</button>{file ? <button type="button" className="button button-secondary" onClick={clear}>Clear</button> : null}</div>
    </section>
    <section className="tool-results-panel" aria-live="polite">
      <div className="tool-panel-head"><div><p className="tool-panel-kicker">Before &amp; after</p><h2>Image preview</h2></div></div>
      {!before ? <div className="result-empty"><span aria-hidden="true">▧</span><h2>Your previews will appear here</h2><p>Choose an image to inspect its dimensions and file size.</p></div> : <div className="image-comparison"><figure><div>{before ? <Image unoptimized src={before} width={520} height={320} alt="Original selected image preview" /> : null}</div><figcaption><b>Original</b><span>{original.width} × {original.height} px · {file ? fileSize(file.size) : ""}</span></figcaption></figure><figure className={!after ? "image-awaiting" : ""}><div>{after ? <Image unoptimized src={after} width={520} height={320} alt="Converted image preview" /> : <span>Converted preview</span>}</div><figcaption><b>Converted</b><span>{blob ? `${dimensions} · ${fileSize(blob.size)}` : "Resize to compare"}</span></figcaption></figure></div>}
      {blob && after && file ? <><div className="image-savings"><span>File-size change</span><b>{blob.size <= file.size ? `${((1 - blob.size / file.size) * 100).toFixed(0)}% smaller` : `${((blob.size / file.size - 1) * 100).toFixed(0)}% larger`}</b></div><a className="button button-cyan result-download" href={after} download={`ebay-image.${extension[blob.type as keyof typeof extension]}`}>Download converted image</a></> : null}
    </section>
  </div>;
}
