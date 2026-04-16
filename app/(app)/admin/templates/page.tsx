"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function TemplatesPage() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [zones, setZones] = useState<any[]>([]);
  const [currentLabel, setCurrentLabel] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (ev) => setImage(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleMouseDown = (e: any) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    setStartX(e.clientX - rect.left);
    setStartY(e.clientY - rect.top);
    setIsDrawing(true);
  };

  const handleMouseUp = (e: any) => {
    if (!isDrawing) return;
    const rect = canvasRef.current!.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;

    const newZone = {
      fieldId: `field_${Date.now()}`,
      label: currentLabel || "Unnamed",
      zone: {
        x: Math.min(startX, endX) / rect.width,
        y: Math.min(startY, endY) / rect.height,
        w: Math.abs(endX - startX) / rect.width,
        h: Math.abs(endY - startY) / rect.height,
      },
      anchorText: null,
    };

    setZones([...zones, newZone]);
    setIsDrawing(false);
  };

  const saveTemplate = async () => {
    // In real app you would call /api/admin/templates
    alert("Template saved! (In production this would save to DB)");
    router.push("/admin");
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Field Mapper – Teach the AI</h1>
      <input type="file" accept="image/*,.pdf" onChange={handleImageUpload} className="mb-6" />

      {image && (
        <div className="relative border-2 border-dashed border-gray-400">
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            className="cursor-crosshair"
            style={{ backgroundImage: `url(${image})`, backgroundSize: "contain", backgroundRepeat: "no-repeat" }}
          />
          {zones.map((z, i) => (
            <div
              key={i}
              className="absolute border-2 border-blue-500 bg-blue-100/30 flex items-center justify-center text-xs font-bold"
              style={{
                left: `${z.zone.x * 100}%`,
                top: `${z.zone.y * 100}%`,
                width: `${z.zone.w * 100}%`,
                height: `${z.zone.h * 100}%`,
              }}
            >
              {z.label}
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex gap-3">
        <input
          value={currentLabel}
          onChange={(e) => setCurrentLabel(e.target.value)}
          placeholder="Field name (e.g. student_name)"
          className="border px-4 py-2 rounded-lg flex-1"
        />
        <button onClick={saveTemplate} className="bg-green-600 text-white px-8 py-2 rounded-xl">
          Save Template
        </button>
      </div>
    </div>
  );
}