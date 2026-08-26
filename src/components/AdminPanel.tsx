import React, { useState } from 'react';
import type { Course } from '../data';
import { CATEGORIES } from '../data';
import { X, Plus, Trash2 } from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
  onCreateCourse: (course: Course) => void;
  onDeleteCourse: (courseId: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  courses,
  onCreateCourse,
  onDeleteCourse,
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<string>(CATEGORIES[1]);
  const [price, setPrice] = useState(49);
  const [duration, setDuration] = useState('10 Horas');
  const [masterclassCount, setMasterclassCount] = useState(12);
  const [isRecent, setIsRecent] = useState(true);
  const [prerequisites, setPrerequisites] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newCourse: Course = {
      id: 'course-' + Date.now(),
      category,
      title: title.trim(),
      subtitle: subtitle.trim(),
      description: description.trim(),
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800',
      masterclassCount: Number(masterclassCount),
      duration,
      price: Number(price),
      isRecent,
      prerequisites,
      prerequisiteNames: prerequisites.map((id) => courses.find((c) => c.id === id)?.title || id),
      modules: [
        {
          id: 'mod-' + Date.now(),
          title: 'Módulo 1: Introducción',
          lessons: [
            {
              id: 'les-' + Date.now(),
              title: 'Bienvenida y conceptos clave',
              duration: '8 min',
              type: 'video',
              content: 'https://www.w3schools.com/html/mov_bbb.mp4',
            }
          ]
        }
      ]
    };

    onCreateCourse(newCourse);
    setTitle('');
    setSubtitle('');
    setDescription('');
    setPrice(49);
    setDuration('10 Horas');
    setMasterclassCount(12);
    setPrerequisites([]);
  };

  const availableCategories = CATEGORIES.filter((c) => c !== 'Todos');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fadeIn" onClick={onClose}>
      <div
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-8 shadow-modal animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">Panel de Administración</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Existing courses */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Cursos Existentes ({courses.length})</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {courses.map((c) => (
              <div key={c.id} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5">
                <img src={c.image} alt="" className="h-8 w-8 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-900 truncate">{c.title}</p>
                  <p className="text-[10px] text-gray-400">${c.price} USD • {c.category}</p>
                </div>
                <button
                  onClick={() => onDeleteCourse(c.id)}
                  className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500 transition"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Create form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Crear Nuevo Curso</h3>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Título *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Ej: Arquitectura de Agentes de IA"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-primary-300 focus:bg-white focus:ring-2 focus:ring-primary-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Subtítulo</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Ej: Diseña sistemas autónomos escalables"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-primary-300 focus:bg-white focus:ring-2 focus:ring-primary-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Descripción</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Descripción del curso..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-primary-300 focus:bg-white focus:ring-2 focus:ring-primary-100 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Categoría</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-primary-300 focus:bg-white focus:ring-2 focus:ring-primary-100"
            >
              {availableCategories.map((cat) => (
                <option key={cat} value={cat} className="bg-white">{cat}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Precio (USD)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                min={0}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-primary-300 focus:bg-white focus:ring-2 focus:ring-primary-100"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Duración</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-primary-300 focus:bg-white focus:ring-2 focus:ring-primary-100"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Clases</label>
              <input
                type="number"
                value={masterclassCount}
                onChange={(e) => setMasterclassCount(Number(e.target.value))}
                min={1}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-primary-300 focus:bg-white focus:ring-2 focus:ring-primary-100"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isRecent}
                onChange={(e) => setIsRecent(e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-xs text-gray-500">Destacado</span>
            </label>
          </div>

          {courses.length > 0 && (
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Prerequisitos</label>
              <div className="space-y-1.5">
                {courses.map((c) => (
                  <label key={c.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={prerequisites.includes(c.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setPrerequisites([...prerequisites, c.id]);
                        } else {
                          setPrerequisites(prerequisites.filter((id) => id !== c.id));
                        }
                      }}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-xs text-gray-500">{c.title}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary-600 py-3 text-sm font-bold text-white shadow-md shadow-primary-600/20 transition hover:bg-primary-700 hover:shadow-lg"
          >
            <Plus className="h-4 w-4" />
            Crear Curso
          </button>
        </form>
      </div>
    </div>
  );
};
