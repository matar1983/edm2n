import { useState, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import { FileImage, Upload, Download } from "lucide-react";
import { toast } from "sonner";

const FORMATS = [
  { key: "image/png", label: "PNG", ext: "png" },
  { key: "image/jpeg", label: "JPG", ext: "jpg" },
  { key: "image/webp", label: "WEBP", ext: "webp" },
];

const FileConverter = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [target, setTarget] = useState("image/jpeg");
  const [quality, setQuality] = useState("0.9");
  const [outputUrl, setOutputUrl] = useState(null);
  const inputRef = useRef(null);

  const handleFile = (f) => {
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      toast.error("يُدعم صور فقط (PNG / JPG / WEBP)");
      return;
    }
    setFile(f);
    setOutputUrl(null);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(f);
  };

  const convert = () => {
    if (!preview) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (target === "image/jpeg") {
        // JPEG has no alpha channel — fill white bg
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            toast.error("فشل التحويل");
            return;
          }
          const url = URL.createObjectURL(blob);
          setOutputUrl({ url, size: blob.size });
          toast.success("تم التحويل");
        },
        target,
        parseFloat(quality)
      );
    };
    img.src = preview;
  };

  const download = () => {
    if (!outputUrl) return;
    const ext = FORMATS.find((f) => f.key === target)?.ext || "png";
    const a = document.createElement("a");
    a.href = outputUrl.url;
    const base = file?.name?.replace(/\.[^.]+$/, "") || "converted";
    a.download = `${base}.${ext}`;
    a.click();
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  };

  return (
    <div data-testid="file-page">
      <PageHeader icon={FileImage} title="محوّل صيغ الصور" subtitle="PNG ↔ JPG ↔ WEBP — يعمل داخل المتصفح 100%" />
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-12">
        <div
          className="bg-card border-2 border-dashed border-border rounded-2xl p-6 sm:p-8 text-center"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFile(e.dataTransfer.files[0]);
          }}
          data-testid="file-dropzone"
        >
          {!preview ? (
            <>
              <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <div className="font-display font-semibold text-lg mb-1">
                اسحب صورة هنا أو اضغط للاختيار
              </div>
              <div className="text-sm text-muted-foreground mb-4">
                PNG, JPG, WEBP (بدون رفع للخادم)
              </div>
              <button
                onClick={() => inputRef.current?.click()}
                data-testid="file-select-btn"
                className="px-5 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90"
              >
                اختر صورة
              </button>
              <input ref={inputRef} type="file" accept="image/*" hidden
                onChange={(e) => handleFile(e.target.files[0])} data-testid="file-input" />
            </>
          ) : (
            <div>
              <img src={preview} alt="preview" className="max-h-64 mx-auto rounded-xl mb-4 shadow" />
              <div className="text-sm text-muted-foreground mb-1">{file?.name}</div>
              <div className="text-xs text-muted-foreground mb-4 number-display">{formatSize(file?.size || 0)}</div>
              <button
                onClick={() => {
                  setFile(null); setPreview(null); setOutputUrl(null);
                  if (inputRef.current) inputRef.current.value = "";
                }}
                data-testid="file-reset"
                className="text-xs text-muted-foreground hover:text-foreground underline"
              >
                اختيار صورة أخرى
              </button>
            </div>
          )}
        </div>

        {preview && (
          <div className="mt-5 bg-card border border-border rounded-2xl p-6 sm:p-8">
            <label className="text-sm font-medium mb-2 block">تحويل إلى</label>
            <div className="flex gap-2 flex-wrap mb-5" data-testid="file-formats">
              {FORMATS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setTarget(f.key)}
                  data-testid={`file-fmt-${f.ext}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                    target === f.key
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-foreground/70 hover:border-primary/50"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            {target !== "image/png" && (
              <div className="mb-5">
                <label className="text-sm font-medium mb-1.5 block">
                  الجودة: <span className="number-display">{Math.round(parseFloat(quality) * 100)}%</span>
                </label>
                <input
                  type="range" min="0.1" max="1" step="0.05" value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                  data-testid="file-quality"
                  className="w-full accent-primary"
                />
              </div>
            )}
            <div className="flex flex-wrap gap-3">
              <button onClick={convert} data-testid="file-convert-btn"
                className="px-5 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90">
                تحويل
              </button>
              {outputUrl && (
                <button onClick={download} data-testid="file-download-btn"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[hsl(var(--gold))] text-primary font-medium hover:opacity-90">
                  <Download className="w-4 h-4" />
                  تنزيل ({formatSize(outputUrl.size)})
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileConverter;
