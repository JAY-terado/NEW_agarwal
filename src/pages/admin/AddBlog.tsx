import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image as ImageIcon, Save, X, Eye } from 'lucide-react';
import { useBlogContext } from '../../context/BlogContext';

export default function AddBlog() {
  const navigate = useNavigate();
  const { addBlog } = useBlogContext();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !excerpt || !content || !image) {
      alert('Please fill out all fields and upload an image.');
      return;
    }

    const newBlog = {
      id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      title,
      category,
      excerpt,
      content: content.split('\\n').filter(p => p.trim() !== ''),
      image,
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };

    addBlog(newBlog);
    navigate('/admin/blogs');
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
          {/* Image Upload */}
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold text-taupe mb-2">Cover Image</label>
            <div className="border-2 border-dashed border-line rounded-xl p-8 text-center relative hover:bg-ivory/50 transition-colors">
              {image ? (
                <div className="relative w-full h-48 rounded-lg overflow-hidden">
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setImage('')}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md hover:bg-rose-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center text-taupe">
                    <ImageIcon className="w-10 h-10 mb-3 opacity-50" />
                    <p className="text-sm font-medium">Click or drag image to upload</p>
                    <p className="text-xs mt-1 opacity-75">16:9 ratio recommended</p>
                  </div>
                </>
              )}
            </div>
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
            <p className="text-[10px] text-taupe/80 -mt-1 mb-1">Separate paragraphs with a blank line (Enter).</p>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Write your amazing article here..."
              rows={12}
              className="border border-line rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brass text-ink font-medium resize-y"
            />
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
                {content ? content.split('\\n').filter(p => p.trim() !== '').map((paragraph, index) => (
                  <p key={index} className="text-sm text-ink-soft leading-relaxed font-light">
                    {paragraph}
                  </p>
                )) : (
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
