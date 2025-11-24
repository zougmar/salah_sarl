import { createContext, useCallback, useContext, useState } from 'react';
import { TaskAPI } from '../services/api';

export const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});

  const fetchTasks = useCallback(
    async (customFilters = {}) => {
      setLoading(true);
      try {
        const { data } = await TaskAPI.list({ ...filters, ...customFilters });
        setTasks(data);
      } finally {
        setLoading(false);
      }
    },
    [filters]
  );

  const refreshMyTasks = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await TaskAPI.mine();
      setTasks(data);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    tasks,
    loading,
    filters,
    setFilters,
    fetchTasks,
    refreshMyTasks,
    setTasks
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTaskContext = () => useContext(TaskContext);

