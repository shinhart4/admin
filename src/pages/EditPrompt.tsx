// src/pages/EditPrompt.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { countries, gradeLevels } from '../routes';
import { supabase } from '../supabase'; 

function EditPrompt() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    question: '',
    answer: '',
    gradeLevel: '6e',
    country: 'FR',
  });

  useEffect(() => {
    const fetchPrompt = async () => {
      const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching prompt:', error);
      } else {
        setForm({
          question: data.question,
          answer: data.answer,
          gradeLevel: data.gradeLevel,
          country: data.country,
        });
      }
    };
    fetchPrompt();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from('prompts')
      .upsert([form]);

    if (error) {
      console.error('Error saving prompt:', error);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Edit Prompt</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label className="block mb-1 font-medium">Question</label>
          <input type="text" name="question" value={form.question} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Answer</label>
          <textarea name="answer" value={form.answer} onChange={handleChange} rows={4} className="w-full border p-2 rounded"></textarea>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Grade Level</label>
            <select name="gradeLevel" value={form.gradeLevel} onChange={handleChange} className="w-full border p-2 rounded">
              {gradeLevels.map(level => <option key={level} value={level}>{level}</option>)}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Country</label>
            <select name="country" value={form.country} onChange={handleChange} className="w-full border p-2 rounded">
              {countries.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
            </select>
          </div>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
      </form>
    </div>
  );
}

export default EditPrompt;
