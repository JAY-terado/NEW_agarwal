import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, X, Eye } from 'lucide-react';
import { useBlogContext } from '../../context/BlogContext';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { updateBlogAxios, getBlogByIdAxios } from '../../_api/admin';
import Swal from 'sweetalert2';

export default function EditBlog() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { refreshBlogs } = useBlogContext();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

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

  useEffect(() => {
    if (id) {
      getBlogByIdAxios(Number(id)).then((response) => {
        const data = response.data || response;
        if (data) {
          setTitle(data.titlename || '');
          setCategory(data.category || '');
          setExcerpt(data.summary || '');
          setContent(data.article || '');
          setImage(data.imageurl?.[0] || '');
          if (quillRef.current && data.article) {
            quillRef.current.root.innerHTML = data.article;
          }
        }
      }).catch((e) => {
        console.error("Failed to load blog", e);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load blog data.',
          confirmButtonColor: '#2b5a50',
        });
      });
    }
  }, [id]);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !excerpt || !content || !image || !id) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: 'Please fill out all fields and provide an image URL.',
        confirmButtonColor: '#2b5a50',
      });
      return;
    }

    try {
      await updateBlogAxios({
        id: Number(id),
        titlename: title,
        category,
        summary: excerpt,
        article: content,
        imageurl: [image]
      });
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Blog updated successfully!',
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
        title: 'Failed to Update',
        text: error?.response?.data?.message || 'There was an error updating the blog.',
        confirmButtonColor: '#2b5a50',
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-serif text-ink">Edit Blog</h1>
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
            <Save className="w-4 h-4" /> Update Blog
          </button>
        </div>
      </div>

      <div className={`grid gap-8 ${showPreview ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1 max-w-3xl'}`}>
        {/* Editor Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-line p-6 sm:p-8 space-y-6">
          {/* Image Link */}
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold text-taupe mb-2">Cover Image URL</label>
            <input
              type="url"
              value={image}
              onChange={e => setImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full border border-line rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brass text-ink font-medium mb-4"
            />
            {image && (
              <div className="relative w-full h-48 rounded-lg overflow-hidden border border-line">
                <img src={image} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setImage('')}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md hover:bg-rose-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
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

              {image ? (
                <div className="w-full h-48 sm:h-64 bg-ivory rounded overflow-hidden mb-8">
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
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
