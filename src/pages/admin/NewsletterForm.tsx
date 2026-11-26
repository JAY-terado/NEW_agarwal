import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, X, UploadCloud, Loader2, Monitor, Smartphone } from 'lucide-react';
import {
  createNewsletterAxios,
  getNewsletterByIdAxios,
  updateNewsletterAxios,
} from '../../_api/newsletter';
import { uploadFileAxios, resolveFileUrl } from '../../_api/fileUpload';
import { LOGO_LIGHT_BASE64 as logoLight, LOGO_DARK_BASE64 as logoDark } from './newsletterLogos';
import toast from 'react-hot-toast';

const esc = (s: string) =>
  String(s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] || c)
  );

export default function NewsletterForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [image, setImage] = useState('');
  const [imageRedirectUrl, setImageRedirectUrl] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(1);

  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isLoading, setIsLoading] = useState(isEdit);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!isEdit || !id) return;
    let active = true;
    (async () => {
      try {
        const res = await getNewsletterByIdAxios(Number(id));
        const item = res?.data ?? res;
        if (!active || !item) return;
        setTitle(item.title || '');
        setSubtitle(item.subtitle || '');
        setImage(item.image || '');
        setImageRedirectUrl(item.imageRedirectUrl || '');
        setDescription(item.description || '');
        setStatus(item.status ?? 1);
      } catch (err: any) {
        toast.error(err?.response?.data?.message || 'Failed to load newsletter details');
      } finally {
        if (active) setIsLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [isEdit, id]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const res: any = await uploadFileAxios(file, 'newsletter');
      const uploadedUrl =
        res?.file?.fileUrl || res?.data?.fileURL || res?.data?.fileUrl || '';
      if (!uploadedUrl) throw new Error('No file URL returned from server');
      setImage(uploadedUrl);
      toast.success('Banner uploaded');
    } catch (err: any) {
      toast.error(err?.message || 'Failed to upload banner image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !subtitle.trim()) {
      toast.error('Title and subtitle are required');
      return;
    }

    const redirectUrl = imageRedirectUrl.trim() || 'https://www.agarwalgroup.in/';

    setIsSubmitting(true);
    try {
      if (isEdit && id) {
        await updateNewsletterAxios({
          id: Number(id),
          title: title.trim(),
          subtitle: subtitle.trim(),
          image: image.trim(),
          imageRedirectUrl: redirectUrl,
          description,
          htmlContent: previewHtml,
          status,
        });
        toast.success('Newsletter updated successfully');
      } else {
        await createNewsletterAxios({
          title: title.trim(),
          subtitle: subtitle.trim(),
          image: image.trim(),
          imageRedirectUrl: redirectUrl,
          description,
          htmlContent: previewHtml,
        });
        toast.success('Newsletter created successfully');
      }
      navigate('/admin/newsletters');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || 'Failed to save newsletter');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resolvedBanner = resolveFileUrl(image);

  const previewHtml = useMemo(() => {
    const bodyHtml = description.trim().startsWith('<')
      ? description
      : esc(description).replace(/\n/g, '<br>');

    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <style>
    body { margin: 0; background: #efeee9; }
    table { border-collapse: collapse; }
    a { color: inherit; }
    @media (max-width: 480px) {
      .pad { padding-left: 22px !important; padding-right: 22px !important; }
      .title { font-size: 36px !important; line-height: 40px !important; }
    }
  </style>
</head>
<body style="margin:0;background:#efeee9;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center" style="padding: 16px 8px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" bgcolor="#faf9f4" style="max-width:640px;color:#223327;font:16px/1.5 Arial,sans-serif;border:1px solid #d7d8cf;">
          <tr>
            <td class="pad" style="padding:22px 36px;border-bottom:1px solid #c6cabc;background:#ffffff;">
              <img src="${esc(logoDark)}" alt="Agarwal Group" width="190" style="display:block;width:190px;max-width:100%;height:auto;border:0;" />
            </td>
          </tr>
          <tr>
            <td class="pad" style="padding:28px 36px 22px;">
              <p style="margin:0 0 8px;color:#785D20;font:bold 11px/17px Arial,sans-serif;letter-spacing:2px;text-transform:uppercase;">PROPERTY JOURNAL</p>
              <h1 class="title" style="margin:0;color:#1E1F1A;font:normal 44px/48px Georgia,serif;overflow-wrap:anywhere;">${esc(title || 'Newsletter Title')}</h1>
            </td>
          </tr>
          ${resolvedBanner
        ? `<tr><td><a href="${esc(imageRedirectUrl.trim() || 'https://www.agarwalgroup.in/')}" target="_blank" style="display:block;text-decoration:none;"><img src="${esc(resolvedBanner)}" alt="${esc(title)}" width="640" style="display:block;width:100%;height:auto;border:0;" /></a></td></tr>`
        : ''
      }
          <tr>
            <td class="pad" bgcolor="#183C2F" style="padding:13px 36px;color:#FFFFFF;font:14px/22px Arial,sans-serif;">
              ${esc(subtitle || 'Newsletter subtitle')}
            </td>
          </tr>
          <tr>
            <td class="pad" style="padding:28px 36px 32px;color:#374438;font:16px/26px Arial,sans-serif;">
              ${bodyHtml}
            </td>
          </tr>
          <!-- 5. FOOTER -->
          <tr>
            <td align="center" class="pad" style="padding: 28px 32px; background-color: #1E1F1A; color: #D4CFC4;">
              <a href="https://www.agarwalgroup.in/" target="_blank" style="display: inline-block; margin-bottom: 16px; text-decoration: none;">
                <img
                  src="${esc(logoLight)}"
                  alt="Agarwal Group"
                  width="170"
                  height="32"
                  style="width: 170px; max-width: 100%; height: auto;"
                />
              </a>

              <p style="margin: 0 0 10px 0; font-size: 12px; line-height: 19px; color: #B8B2A6;">
                9, Gokul Annexe, Agarwal Gardens, Opp. Muljibhai Mehta School,<br />
                Gokul Township, Virar (W), Maharashtra - 401303, India
              </p>

              <p style="margin: 0 0 16px 0; font-size: 12px; line-height: 18px; color: #DCBC7C;">
                <a href="tel:+918408008001" style="color: #DCBC7C; text-decoration: none;">+91 84080 08001</a>
                &nbsp;&middot;&nbsp;
                <a href="mailto:sales@agarwalrealties.com" style="color: #DCBC7C; text-decoration: none;">sales@agarwalrealties.com</a>
              </p>

              <p style="margin: 0; font-size: 11px; line-height: 18px; color: #8F897D;">
                &copy; 2026 Agarwal Group. All rights reserved. &middot;
                <a href="{{UNSUBSCRIBE_URL}}" style="color: #DCBC7C; text-decoration: underline;">Unsubscribe</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  }, [title, subtitle, resolvedBanner, imageRedirectUrl, description]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-serif text-ink">
          {isEdit ? 'Edit Newsletter' : 'Create Newsletter'}
        </h1>
        <button
          type="button"
          onClick={() => navigate('/admin/newsletters')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-line bg-white text-sm text-ink-soft hover:text-ink"
        >
          <X className="w-4 h-4" /> Cancel
        </button>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-xl p-12 text-center text-taupe border border-line">
          Loading newsletter...
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[360px_minmax(0,1fr)] gap-8 items-start">
          {/* Left: Editor */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-sm border border-line p-6 flex flex-col gap-4"
          >
            <h2 className="font-serif text-xl text-ink mb-1">Edit this issue</h2>

            <div>
              <label className="block text-xs font-bold text-ink-soft mb-1.5">
                Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Agarwal Infinity"
                className="w-full border border-line rounded-lg px-3 py-2 text-sm text-ink outline-none focus:border-brass-deep"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-ink-soft mb-1.5">
                Banner image
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                disabled={isUploading}
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-line bg-ivory text-sm font-medium text-ink hover:bg-ivory/70 disabled:opacity-60"
              >
                {isUploading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <UploadCloud className="w-4 h-4" />
                )}
                {isUploading ? 'Uploading...' : 'Choose Image'}
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink-soft mb-1.5">
                Image redirect URL (optional)
              </label>
              <input
                type="url"
                value={imageRedirectUrl}
                onChange={(e) => setImageRedirectUrl(e.target.value)}
                placeholder="https://www.agarwalgroup.in/"
                className="w-full border border-line rounded-lg px-3 py-2 text-sm text-ink outline-none focus:border-brass-deep"
              />
            </div>

            {/* <div>
              <label className="block text-xs font-bold text-ink-soft mb-1.5">
                Hosted image URL (optional)
              </label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://..."
                className="w-full border border-line rounded-lg px-3 py-2 text-sm text-ink outline-none focus:border-brass-deep"
              />
            </div> */}

            <div>
              <label className="block text-xs font-bold text-ink-soft mb-1.5">
                Subtitle *
              </label>
              <input
                type="text"
                required
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Virar West · 2, 3 & 4 BHK residences"
                className="w-full border border-line rounded-lg px-3 py-2 text-sm text-ink outline-none focus:border-brass-deep"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-ink-soft mb-1.5">
                Editorial copy (Description) *
              </label>
              <textarea
                rows={6}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write newsletter content..."
                className="w-full border border-line rounded-lg px-3 py-2 text-sm text-ink outline-none focus:border-brass-deep resize-y"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isUploading}
              className="mt-2 flex items-center justify-center gap-2 bg-pine hover:bg-pine-deep text-white px-5 py-3 rounded-lg text-sm font-bold tracking-wide transition-colors shadow-md disabled:opacity-60"
            >
              <Save className="w-4 h-4" />
              {isSubmitting ? 'Saving...' : isEdit ? 'Update Newsletter' : 'Save Newsletter'}
            </button>
          </form>

          {/* Right: Live Preview */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-taupe">
                Live preview
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewMode('desktop')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold border transition-colors ${previewMode === 'desktop'
                    ? 'bg-pine text-white border-pine'
                    : 'bg-white text-ink border-line'
                    }`}
                >
                  <Monitor className="w-3.5 h-3.5" /> Desktop
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode('mobile')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold border transition-colors ${previewMode === 'mobile'
                    ? 'bg-pine text-white border-pine'
                    : 'bg-white text-ink border-line'
                    }`}
                >
                  <Smartphone className="w-3.5 h-3.5" /> Mobile
                </button>
              </div>
            </div>

            <div className="w-full flex justify-center">
              <iframe
                ref={iframeRef}
                title="Newsletter live preview"
                srcDoc={previewHtml}
                sandbox="allow-same-origin"
                className="bg-white border border-line rounded-lg shadow-md transition-all duration-200"
                style={{
                  width: '100%',
                  maxWidth: previewMode === 'mobile' ? '375px' : '680px',
                  height: '860px',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
