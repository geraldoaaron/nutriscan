"use client";

import { useCallback, useRef, useState } from "react";
import { Upload, X, Camera, Image as ImageIcon, Loader2, ScanEye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/language-provider";

const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const MAX_SIZE_MB = 10;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

interface ImageUploadProps {
  imagePreview: string | null;
  onImageSelect: (file: File | null) => void;
  onRemoveImage: () => void;
  onAnalyze: (base64: string, mimeType: string) => void;
  isAnalyzing: boolean;
  disabled?: boolean;
}

export function ImageUpload({
  imagePreview,
  onImageSelect,
  onRemoveImage,
  onAnalyze,
  isAnalyzing,
  disabled,
}: ImageUploadProps) {
  const { t } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback((file: File): boolean => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setValidationError(t("upload.support"));
      return false;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setValidationError(t("upload.error.size"));
      return false;
    }
    setValidationError(null);
    return true;
  }, [t]);

  const handleFile = useCallback(
    (file: File) => {
      if (validateFile(file)) {
        onImageSelect(file);
      }
    },
    [validateFile, onImageSelect]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) setIsDragging(true);
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled) return;

      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [disabled, handleFile]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleAnalyze = useCallback(() => {
    if (!imagePreview) return;
    
    const matches = imagePreview.match(/^data:(image\/[a-zA-Z]+);base64,(.+)$/);
    if (matches && matches.length === 3) {
      onAnalyze(matches[2], matches[1]);
    }
  }, [imagePreview, onAnalyze]);

  if (imagePreview) {
    return (
      <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-card shadow-xl">
        <div className="relative aspect-video w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imagePreview}
            alt="Uploaded meal"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        <div className="flex items-center justify-between gap-3 p-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onRemoveImage}
            disabled={isAnalyzing}
            className="gap-2 border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300"
            id="remove-image-btn"
          >
            <X className="h-4 w-4" />
            {t("upload.remove")}
          </Button>

          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25 hover:from-emerald-600 hover:to-teal-700 transition-all duration-300"
            id="analyze-btn"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t("upload.analyzing")}
              </>
            ) : (
              <>
                <ScanEye className="h-4 w-4" />
                {t("upload.analyze")}
              </>
            )}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-3">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
        className={cn(
          "relative flex min-h-[280px] cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-8 transition-all duration-300 text-center",
          isDragging
            ? "border-emerald-400 bg-emerald-500/5 shadow-lg shadow-emerald-500/10"
            : "border-white/15 bg-card/50 hover:border-emerald-400/50 hover:bg-card/80",
          disabled && "cursor-not-allowed opacity-50"
        )}
        id="upload-dropzone"
      >
        <div
          className={cn(
            "flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300",
            isDragging
              ? "bg-emerald-500/20 scale-110"
              : "bg-gradient-to-br from-emerald-500/10 to-teal-500/10"
          )}
        >
          {isDragging ? (
            <Upload className="h-8 w-8 text-emerald-400 animate-bounce" />
          ) : (
            <ImageIcon className="h-8 w-8 text-emerald-400" />
          )}
        </div>

        <div className="space-y-2">
          <p className="text-base font-semibold text-foreground">
            {t("upload.drag")}
          </p>
          <div className="flex items-center justify-center gap-2 pt-1">
            <span className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              JPG
            </span>
            <span className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              PNG
            </span>
            <span className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              WEBP
            </span>
            <span className="text-[11px] text-muted-foreground">
              • Max {MAX_SIZE_MB}MB
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-2 mt-2">
          <Camera className="h-4 w-4 text-emerald-400" />
          <span className="text-xs font-medium text-emerald-400">
            {t("upload.camera")}
          </span>
        </div>
      </div>

      {validationError && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
          {validationError}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        capture="environment"
        onChange={handleInputChange}
        className="hidden"
        id="file-input"
      />
    </div>
  );
}
