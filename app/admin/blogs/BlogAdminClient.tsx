"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  Image as ImageIcon, 
  Eye, 
  ArrowLeft,
  Search,
  MoreVertical,
  RefreshCw,
  ExternalLink
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function BlogAdminClient() {
  const supabase = createClient();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title_en: "",
    slug: "",
    category: "Neurodiversity",
    cover_image_url: ""
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-2xl border border-white/10 my-8 shadow-2xl',
        },
      }),
      Link.configure({ openOnClick: false }),
    ],
    content: '',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[500px] text-xl font-medium leading-relaxed font-serif text-zinc-300',
      },
    },
  });

  const fetchBlogs = async () => {
    setLoading(true);
    const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
    setBlogs(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleEdit = (blog: any) => {
    setEditingId(blog.id);
    setFormData({
      title_en: blog.title_en || "",
      slug: blog.slug || "",
      category: blog.category || "Neurodiversity",
      cover_image_url: blog.cover_image_url || ""
    });
    if (editor) {
      editor.commands.setContent(blog.html_content || blog.content_markdown || '');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCreate = () => {
    setEditingId("new");
    setFormData({
      title_en: "",
      slug: "",
      category: "Parenting",
      cover_image_url: ""
    });
    if (editor) {
      editor.commands.setContent('<p>Tell your story...</p>');
    }
  };

  const handleSave = async () => {
    const html_content = editor?.getHTML() || "";
    const content_markdown = editor?.getText() || ""; // In a real app, use a proper HTML-to-MD converter

    const payload = {
      ...formData,
      html_content,
      content_markdown,
      status: "published",
      author_name: "Insighte Clinical Team"
    };

    if (editingId === "new") {
      await supabase.from('blog_posts').insert([payload]);
    } else {
      await supabase.from('blog_posts').update(payload).eq('id', editingId);
    }
    
    setEditingId(null);
    fetchBlogs();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    await supabase.from('blog_posts').delete().eq('id', id);
    fetchBlogs();
  };

  const addImage = () => {
    const url = window.prompt("Paste Image URL:");
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  if (editingId) {
    return (
      <div className="min-h-screen bg-[#0d0f1a] text-white selection:bg-[#D3C4B5]/30">
        {/* MEDIUM-STYLE TOP BAR */}
        <nav className="fixed top-0 left-0 right-0 h-20 bg-[#0d0f1a]/80 backdrop-blur-xl border-b border-white/5 z-50 px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button onClick={() => setEditingId(null)} className="h-10 w-10 rounded-full hover:bg-white/5 flex items-center justify-center transition-all">
              <ArrowLeft size={20} />
            </button>
            <div className="h-6 w-px bg-white/10" />
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic">Drafting Insight</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="text-zinc-400 hover:text-white"
              onClick={() => window.open(`/blog/${formData.slug}?preview=true`, '_blank')}
            >
              <Eye className="h-4 w-4 mr-2" /> Preview
            </Button>
            <Button onClick={handleSave} className="bg-[#BACCB3] text-[#382F24] font-black uppercase tracking-widest text-[10px] px-8 rounded-full hover:bg-white transition-all">
              Publish
            </Button>
          </div>
        </nav>

        {/* EDITOR AREA */}
        <main className="pt-32 pb-24 max-w-3xl mx-auto px-6 space-y-12">
          {/* TITLE INPUT */}
          <textarea 
            placeholder="Title"
            value={formData.title_en}
            onChange={(e) => setFormData({...formData, title_en: e.target.value})}
            className="w-full bg-transparent border-none text-6xl font-black font-manrope tracking-tighter focus:ring-0 placeholder:text-zinc-800 resize-none overflow-hidden"
            rows={1}
            onInput={(e: any) => {
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
          />

          {/* METADATA BAR */}
          <div className="flex flex-wrap items-center gap-6 border-y border-white/5 py-4">
             <div className="flex items-center gap-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Category:</span>
                <select 
                  value={formData.category} 
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  className="bg-white/5 border-none text-xs font-bold text-[#D3C4B5] rounded-lg px-3 py-1 focus:ring-0"
                >
                  <option value="Neurodiversity">Neurodiversity</option>
                  <option value="Parenting">Parenting</option>
                  <option value="Clinical">Clinical</option>
                  <option value="Education">Education</option>
                </select>
             </div>
             <div className="flex items-center gap-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Slug:</span>
                <input 
                  value={formData.slug} 
                  onChange={e => setFormData({...formData, slug: e.target.value})}
                  className="bg-transparent border-none text-xs font-bold text-zinc-400 p-0 focus:ring-0 w-48"
                  placeholder="post-url-slug"
                />
             </div>
             <button onClick={addImage} className="ml-auto text-[10px] font-black uppercase tracking-widest text-[#BACCB3] flex items-center gap-2 hover:text-white transition-all">
                <ImageIcon size={14} /> Add Media
             </button>
          </div>

          {/* MAIN EDITOR */}
          <div className="relative">
            <EditorContent editor={editor} />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="p-6 pt-12 md:p-24 text-white min-h-screen bg-[#0a0b1c] space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
           <div className="flex items-center gap-3 text-[#D3C4B5] font-black uppercase tracking-[0.3em] text-[10px]">
             Wisdom Hub // Editorial
           </div>
           <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase italic leading-[0.8]">
             Blog <br/>
             <span className="text-[#BACCB3]">Publishing.</span>
           </h1>
        </div>
        <Button onClick={handleCreate} className="h-16 px-10 bg-[#D3C4B5] text-[#382F24] font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-white transition-all shadow-2xl">
          <Plus className="h-5 w-5 mr-3" /> New Insight
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="py-24 flex justify-center"><RefreshCw className="animate-spin text-zinc-700" /></div>
        ) : (
          blogs.map((b) => (
            <div key={b.id} className="group bg-[#111224]/50 border border-white/5 p-8 rounded-[2rem] flex items-center justify-between hover:bg-[#111224] transition-all">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Badge className="bg-[#BACCB3]/10 text-[#BACCB3] border-none text-[8px] font-black uppercase tracking-widest">{b.category}</Badge>
                  <span className="text-[10px] font-black text-zinc-700 uppercase">{new Date(b.created_at).toLocaleDateString()}</span>
                </div>
                <h3 className="text-2xl font-extrabold font-manrope tracking-tighter text-white">{b.title_en}</h3>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => handleEdit(b)} className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center text-zinc-500 hover:text-white transition-all border border-white/5">
                  <Edit2 size={18} />
                </button>
                <button onClick={() => window.open(`/blog/${b.slug}`, '_blank')} className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center text-zinc-500 hover:text-[#BACCB3] transition-all border border-white/5">
                  <ExternalLink size={18} />
                </button>
                <button onClick={() => handleDelete(b.id)} className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center text-zinc-500 hover:bg-red-500/20 hover:text-red-500 transition-all border border-white/5">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
