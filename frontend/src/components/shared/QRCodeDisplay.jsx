import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';
import { Download, Copy, Check } from 'lucide-react';

export const QRCodeDisplay = ({ url, title = 'Scan QR Code' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const svg = document.querySelector('#qr-code-svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = 'location-qr-code.png';
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-slate-900 mb-4 text-center">{title}</h3>
      
      <div className="flex justify-center mb-4 p-4 bg-white rounded-lg border-2 border-slate-200">
        <QRCodeSVG
          id="qr-code-svg"
          value={url}
          size={256}
          level="H"
          includeMargin={true}
          fgColor="#1e293b"
          bgColor="#ffffff"
        />
      </div>

      <div className="space-y-3">
        <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
          <p className="text-xs text-slate-600 mb-1">URL:</p>
          <p className="text-sm font-mono text-slate-900 break-all">{url}</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2 px-4 rounded-lg transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy URL
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Download QR
          </button>
        </div>

        <p className="text-xs text-center text-slate-500 mt-4">
          Scan this QR code with your mobile device to check in your location
        </p>
      </div>
    </div>
  );
};

