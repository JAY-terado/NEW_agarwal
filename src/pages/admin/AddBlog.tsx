import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X, Eye, UploadCloud, Image as ImageIcon, Link2, Loader2 } from 'lucide-react';
import { useBlogContext } from '../../context/BlogContext';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { createBlogAxios } from '../../_api/admin';
import { uploadFileAxios, resolveFileUrl } from '../../_api/fileUpload';
import Swal from 'sweetalert2';

export default function AddBlog() {
  const navigate = useNavigate();
  const { refreshBlogs } = useBlogContext();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [imageFileName, setImageFileName] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Write your amazing article here...'
      });

      quillRef.current.on('text-change', () => {
        setContent(quillRef.current?.root.innerHTML || '');
      });
    }
  }, []);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid File Format',
        text: 'Please select a valid image file (PNG, JPG, WEBP, etc.).',
        confirmButtonColor: '#2b5a50',
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      Swal.fire({
        icon: 'error',
        title: 'File Too Large',
        text: 'Please upload an image smaller than 10MB.',
        confirmButtonColor: '#2b5a50',
      });
      return;
    }

    // Instant local preview so user sees the image right away
    const localBlob = URL.createObjectURL(file);
    setPreviewUrl(localBlob);
    setImageFileName(file.name);

    setIsUploading(true);
    try {
      const res = await uploadFileAxios(file, 'blogs');
      setImage(res.data.fileURL);
      if (res.data.fileName) {
        setImageFileName(res.data.fileName);
      }
    } catch (err: any) {
      console.error('File upload error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Upload Failed',
        text: err?.message || 'Failed to upload image to server.',
        confirmButtonColor: '#2b5a50',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleRemoveImage = () => {
    setImage('');
    setImageFileName('');
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isUploading) {
      Swal.fire({
        icon: 'info',
        title: 'Please Wait',
        text: 'Image is still uploading. Please wait a moment.',
        confirmButtonColor: '#2b5a50',
      });
      return;
    }

    if (!title || !category || !excerpt || !content || !image) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: 'Please fill out all fields and provide a cover image.',
        confirmButtonColor: '#2b5a50',
      });
      return;
    }

    try {
      await createBlogAxios({
        title,
        blogCategory: category,
        blogSummary: excerpt,
        blogDescription: content,
        blogImageFileName: imageFileName || image.split('/').pop()?.split('?')[0] || 'blog-image.webp',
        blogImageURL: image,
      });
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Blog published successfully!',
        confirmButtonColor: '#2b5a50',
        timer: 2000,
        showConfirmButton: false
      });
      await refreshBlogs();
      navigate('/admin/blogs');
    } catch (error: any) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to Publish',
        text: error?.response?.data?.message || 'There was an error publishing the blog.',
        confirmButtonColor: '#2b5a50',
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-serif text-ink">Add New Blog</h1>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 bg-ivory border border-line hover:border-brass text-ink px-4 py-2.5 rounded-lg text-sm font-bold tracking-wide transition-colors shadow-sm"
          >
            <Eye className="w-4 h-4" /> {showPreview ? 'Hide Preview' : 'Show Preview'}
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-pine hover:bg-pine-deep text-white px-5 py-2.5 rounded-lg text-sm font-bold tracking-wide transition-colors shadow-md"
          >
            <Save className="w-4 h-4" /> Publish Blogs
          </button>
        </div>
      </div>

      <div className={`grid gap-8 ${showPreview ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1 max-w-3xl'}`}>
        {/* Editor Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-line p-6 sm:p-8 space-y-6">
          {/* Cover Image Upload / URL */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs uppercase tracking-widest font-bold text-taupe">Cover Image</label>
              <div className="flex items-center gap-1 bg-ivory p-0.5 rounded-lg border border-line text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setUploadMode('file')}
                  className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                    uploadMode === 'file'
                      ? 'bg-pine text-white shadow-sm'
                      : 'text-taupe hover:text-ink'
                  }`}
                >
                  <UploadCloud className="w-3.5 h-3.5" /> Upload File
                </button>
                <button
                  type="button"
                  onClick={() => setUploadMode('url')}
                  className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                    uploadMode === 'url'
                      ? 'bg-pine text-white shadow-sm'
                      : 'text-taupe hover:text-ink'
                  }`}
                >
                  <Link2 className="w-3.5 h-3.5" /> Image URL
                </button>
              </div>
            </div>

            {uploadMode === 'file' ? (
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/png,image/jpeg,image/webp,image/avif,image/svg+xml"
                  className="hidden"
                />

                {isUploading ? (
                  <div className="border-2 border-dashed border-brass rounded-xl p-8 text-center bg-brass/5 flex flex-col items-center justify-center gap-3">
                    <Loader2 className="w-8 h-8 text-brass animate-spin" />
                    <div>
                      <p className="text-sm font-semibold text-ink">Uploading cover image...</p>
                      <p className="text-xs text-taupe mt-1">Please wait while the file uploads to the server</p>
                    </div>
                  </div>
                ) : !image && !previewUrl ? (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 ${
                      isDragging
                        ? 'border-brass bg-brass/5 ring-2 ring-brass/20'
                        : 'border-line hover:border-brass bg-ivory/40 hover:bg-ivory/80'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-paper border border-line flex items-center justify-center text-brass shadow-sm">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink">
                        Click to upload <span className="font-normal text-ink-soft">or drag and drop</span>
                      </p>
                      <p className="text-xs text-taupe mt-1">
                        PNG, JPG, WEBP, or SVG (Max 10MB)
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full rounded-xl overflow-hidden border border-line bg-ivory">
                    <div className="relative h-56 w-full">
                      <img src={previewUrl || resolveFileUrl(image)} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                      <div className="absolute top-3 right-3 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-paper/90 backdrop-blur-sm hover:bg-paper text-ink px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md transition-colors flex items-center gap-1.5"
                        >
                          <UploadCloud className="w-3.5 h-3.5 text-brass" /> Change
                        </button>
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="w-8 h-8 rounded-lg bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-md transition-colors"
                          title="Remove image"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <div className="flex items-center gap-2">
                          <ImageIcon className="w-4 h-4 text-brass-bright shrink-0" />
                          <span className="text-xs font-medium truncate">
                            {imageFileName || 'Uploaded Image'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <input
                  type="url"
                  value={image}
                  onChange={e => {
                    setImage(e.target.value);
                    setPreviewUrl(e.target.value);
                    setImageFileName(e.target.value.split('/').pop()?.split('?')[0] || '');
                  }}
                  placeholder="https://example.com/image.webp"
                  className="w-full border border-line rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brass text-ink font-medium mb-4"
                />
                {(image || previewUrl) && (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border border-line">
                    <img src={previewUrl || image} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md hover:bg-rose-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest font-bold text-taupe">Title</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. The Future of Real Estate"
                className="border border-line rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brass text-ink font-medium"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest font-bold text-taupe">Category</label>
              <input
                type="text"
                value={category}
                onChange={e => setCategory(e.target.value)}
                placeholder="e.g. Market Trends"
                className="border border-line rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brass text-ink font-medium"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest font-bold text-taupe">Excerpt (Short Summary)</label>
            <textarea
              value={excerpt}
              onChange={e => setExcerpt(e.target.value)}
              placeholder="A brief summary that appears on the blog card..."
              rows={2}
              className="border border-line rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brass text-ink font-medium resize-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest font-bold text-taupe">Full Article Content</label>
            <div className="bg-white rounded-lg border border-line focus-within:border-brass overflow-hidden">
              <style>{`.ql-editor { min-height: 250px; font-size: 14px; } .ql-toolbar { border-top: none !important; border-left: none !important; border-right: none !important; border-bottom: 1px solid var(--line) !important; background: var(--ivory); } .ql-container { border: none !important; }`}</style>
              <div ref={editorRef} />
            </div>
          </div>
        </form>

        {/* Live Preview Panel */}
        {showPreview && (
          <div className="bg-ivory rounded-xl border border-line p-6 relative overflow-hidden flex flex-col">
            <div className="absolute top-0 left-0 right-0 bg-white border-b border-line px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-taupe text-center z-10">
              Live Preview
            </div>
            <div className="mt-8 flex-1 overflow-y-auto bg-white rounded-lg shadow-sm border border-line p-6">

              <h1 className="font-serif text-3xl sm:text-4xl font-light leading-[1.1] text-ink mb-4">
                {title || 'Your Article Title'}
              </h1>

              <div className="flex flex-wrap gap-3 items-center text-[10px] uppercase tracking-wider text-ink-soft font-semibold border-y border-line py-3 mb-6">
                <span>By <span className="text-ink font-bold border-b border-ink">Editorial Team</span></span>
                <span className="w-1 h-1 rounded-full bg-line"></span>
                <span>Published {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
              </div>

              {previewUrl || image ? (
                <div className="w-full h-48 sm:h-64 bg-ivory rounded overflow-hidden mb-8">
                  <img src={previewUrl || resolveFileUrl(image)} alt="Preview" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-full h-48 sm:h-64 bg-ivory rounded border border-line-light flex items-center justify-center text-taupe mb-8">
                  No Image Uploaded
                </div>
              )}

              <p className="text-base font-serif text-ink font-medium leading-relaxed mb-6 italic">
                {excerpt || 'Your excerpt will appear here as a styled intro quote.'}
              </p>

              <article className="flex flex-col gap-4">
                {content ? (
                  <div
                    className="prose prose-sm max-w-none text-ink-soft font-light leading-relaxed [&>p]:mb-4"
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                ) : (
                  <p className="text-sm text-ink-soft leading-relaxed font-light">
                    Your article content will flow here...
                  </p>
                )}
              </article>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
