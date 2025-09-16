import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
    <div className="p-6 max-w-2xl mx-auto space-y-4 bg-gradient-to-b from-custom-light-yellow via-custom-orange to-custom-dark-orange">
      <h1 className="text-2xl font-bold text-custom-light-brown">Edit Prompt</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-lg">
        <div>
          <label className="block mb-1 font-medium text-custom-light-brown">Question</label>
          <input type="text" name="question" value={form.question} onChange={handleChange} className="w-full border p-2 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-custom-light-brown" />
        </div>
        <div>
          <label className="block mb-1 font-medium text-custom-light-brown">Answer</label>
          <textarea name="answer" value={form.answer} onChange={handleChange} rows={4} className="w-full border p-2 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-custom-light-brown"></textarea>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium text-custom-light-brown">Grade Level</label>
            <select name="gradeLevel" value={form.gradeLevel} onChange={handleChange} className="w-full border p-2 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-custom-light-brown">
              {gradeLevels.map(level => <option key={level} value={level}>{level}</option>)}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium text-custom-light-brown">Country</label>
            <select name="country" value={form.country} onChange={handleChange} className="w-full border p-2 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-custom-light-brown">
              {countries.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
            </select>
          </div>
        </div>
        <button type="submit" className="bg-custom-dark-brown text-white px-6 py-3 rounded-lg hover:bg-custom-light-brown transition-all duration-300 transform hover:scale-105">
          Save
        </button>
      </form>
    </div>
  );
}

export default EditPrompt;
