import React, { useState } from 'react';
import { Calendar, Clock, FileUp, Plus, X } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  date: string;
  time: string;
  category: string;
}

interface RoadmapPhase {
  title: string;
  days: string;
  tasks: string[];
}

const generateICSContent = (tasks: Task[]) => {
  const events = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//AI Implementation Tasks//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    ...tasks.flatMap(task => {
      const startDate = new Date(`${task.date}T${task.time}`);
      const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour duration

      return [
        'BEGIN:VEVENT',
        `SUMMARY:${task.title}`,
        `DTSTART:${startDate.toISOString().replace(/[-:.]/g, '')}`,
        `DTEND:${endDate.toISOString().replace(/[-:.]/g, '')}`,
        `DESCRIPTION:Category: ${task.category}`,
        'END:VEVENT'
      ];
    }),
    'END:VCALENDAR'
  ].join('\r\n');

  return events;
};

export default function TaskReminder() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [calendarType, setCalendarType] = useState('');
  const [showImportModal, setShowImportModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    date: '',
    time: '',
    category: ''
  });

  const calendarTypes = [
    'Apple Calendar',
    'Google Calendar',
    'Microsoft Outlook'
  ].sort();

  const exportToCalendar = () => {
    if (!calendarType || tasks.length === 0) return;

    const icsContent = generateICSContent(tasks);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ai-implementation-tasks${calendarType === 'Apple Calendar' ? '.ics' : '.ical'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importFromRoadmap = () => {
    const roadmapData = localStorage.getItem('aiRoadmap');
    if (roadmapData) {
      const roadmap = JSON.parse(roadmapData);
      let startDate = new Date();
      
      const newTasks = roadmap.flatMap((phase: RoadmapPhase) => {
        const [startDay] = phase.days.split('-').map(Number);
        return phase.tasks.map((task: string, index: number) => {
          const taskDate = new Date(startDate);
          taskDate.setDate(taskDate.getDate() + startDay - 1 + Math.floor(index / 2));
          const taskTime = (index % 2 === 0) ? '09:00' : '14:00';
          
          return {
            id: Math.random().toString(36).substr(2, 9),
            title: task,
            date: taskDate.toISOString().split('T')[0],
            time: taskTime,
            category: phase.title
          };
        });
      });

      setTasks(prev => [...prev, ...newTasks]);
      setShowImportModal(false);
    }
  };

  const addTask = () => {
    if (!newTask.title || !newTask.date || !newTask.time || !newTask.category) return;

    setTasks(prev => [...prev, {
      id: Math.random().toString(36).substr(2, 9),
      ...newTask
    }]);
    setNewTask({ title: '', date: '', time: '', category: '' });
    setShowAddTaskModal(false);
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-3 text-skin-primary">AI Task Calendar</h2>
        <p className="text-skin-secondary text-lg">Stay on track with your AI implementation journey</p>
      </div>

      <div className="max-w-4xl mx-auto bg-skin-secondary p-6 rounded-xl border border-skin-accent">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <select
              value={calendarType}
              onChange={(e) => setCalendarType(e.target.value)}
              className="px-4 py-2 rounded-lg bg-skin-primary border border-skin-accent text-skin-primary"
            >
              <option value="">Select Calendar Type</option>
              {calendarTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <button
              onClick={() => setShowImportModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-brand-secondary text-white rounded-lg hover:bg-opacity-90 transition"
            >
              <FileUp className="h-5 w-5" />
              <span>Import from Roadmap</span>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowAddTaskModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-brand-secondary text-white rounded-lg hover:bg-opacity-90 transition"
            >
              <Plus className="h-5 w-5" />
              <span>Add Task</span>
            </button>
            <button
              onClick={exportToCalendar}
              disabled={!calendarType || tasks.length === 0}
              className="flex items-center space-x-2 px-4 py-2 bg-brand-gold text-brand-dark rounded-lg hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Calendar className="h-5 w-5" />
              <span>Export to Calendar</span>
            </button>
          </div>
        </div>

        <div className="grid gap-4">
          {tasks.map(task => (
            <div
              key={task.id}
              className="p-4 bg-skin-primary rounded-lg border border-skin-accent"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-skin-primary">{task.title}</h4>
                  <p className="text-sm text-skin-secondary">{task.category}</p>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-4 text-skin-secondary">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{task.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{task.time}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-brand-secondary hover:text-brand-gold transition"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {tasks.length === 0 && (
          <div className="text-center py-12 text-skin-secondary">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Import your roadmap tasks or add tasks manually to get started</p>
          </div>
        )}
      </div>

      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-skin-primary p-6 rounded-xl max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4 text-skin-primary">Import from Roadmap</h3>
            <p className="text-skin-secondary mb-6">
              This will import all tasks from your generated AI implementation roadmap.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 rounded-lg bg-skin-secondary text-skin-primary hover:bg-skin-accent transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  importFromRoadmap();
                  setShowImportModal(false);
                }}
                className="px-4 py-2 rounded-lg bg-brand-gold text-brand-dark hover:bg-opacity-90 transition"
              >
                Import Tasks
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddTaskModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-skin-primary p-6 rounded-xl max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4 text-skin-primary">Add New Task</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-skin-primary mb-2">Task Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg bg-skin-secondary border border-skin-accent text-skin-primary"
                  placeholder="Enter task title"
                />
              </div>
              <div>
                <label className="block text-skin-primary mb-2">Category</label>
                <input
                  type="text"
                  value={newTask.category}
                  onChange={(e) => setNewTask(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg bg-skin-secondary border border-skin-accent text-skin-primary"
                  placeholder="Enter category"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-skin-primary mb-2">Date</label>
                  <input
                    type="date"
                    value={newTask.date}
                    onChange={(e) => setNewTask(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg bg-skin-secondary border border-skin-accent text-skin-primary"
                  />
                </div>
                <div>
                  <label className="block text-skin-primary mb-2">Time</label>
                  <input
                    type="time"
                    value={newTask.time}
                    onChange={(e) => setNewTask(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg bg-skin-secondary border border-skin-accent text-skin-primary"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowAddTaskModal(false)}
                className="px-4 py-2 rounded-lg bg-skin-secondary text-skin-primary hover:bg-skin-accent transition"
              >
                Cancel
              </button>
              <button
                onClick={addTask}
                className="px-4 py-2 rounded-lg bg-brand-gold text-brand-dark hover:bg-opacity-90 transition"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}