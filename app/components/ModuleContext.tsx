"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Module {
  id: number;
  title: string;
  description: string;
  lessons: number;
  duration: string;
  href: string;
  locked: boolean;
  completed: boolean;
}

interface ModuleContextType {
  modules: Module[];
  updateModuleCompletion: (moduleId: number, completed: boolean) => void;
}

const ModuleContext = createContext<ModuleContextType | undefined>(undefined);

export function ModuleProvider({ children }: { children: ReactNode }) {
  const [modules, setModules] = useState<Module[]>([
    {
      id: 1,
      title: "Classification of Salad",
      description: "We begin by defining the roles salads play in a meal—whether they serve as a light appetizer, a refreshing side dish, or a hearty main course.",
      lessons: 4,
      duration: "25 min",
      href: "../module1",
      locked: false,
      completed: false
    },
    {
      id: 2,
      title: "Components of a Salad",
      description: "You will learn the four essential pillars of salad construction: the base, the body, the garnish, and the dressing.",
      lessons: 5,
      duration: "30 min",
      href: "/module2",
      locked: false,
      completed: false
    },
    {
      id: 3,
      title: "Types of Salad",
      description: "We explore tossed, composed, bound, and fruit-based salads, highlighting their differences.",
      lessons: 6,
      duration: "35 min",
      href: "/module3",
      locked: false,
      completed: false
    },
    {
      id: 4,
      title: "Guidelines in Preparing Salad & Dressing",
      description: "This module covers freshness, proper cleaning techniques, and making well-balanced dressings.",
      lessons: 5,
      duration: "28 min",
      href: "/module4",
      locked: false,
      completed: false
    }
  ]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('completedModules');
    if (stored) {
      const completedData = JSON.parse(stored);
      setModules(prev => prev.map(module => ({
        ...module,
        completed: completedData[`module${module.id}`] || false
      })));
    }
  }, []);

  const updateModuleCompletion = (moduleId: number, completed: boolean) => {
    // Update state
    setModules(prev => prev.map(module =>
      module.id === moduleId ? { ...module, completed } : module
    ));

    // Update localStorage
    const stored = localStorage.getItem('completedModules');
    const completedData = stored ? JSON.parse(stored) : {};
    completedData[`module${moduleId}`] = completed;
    localStorage.setItem('completedModules', JSON.stringify(completedData));
  };

  return (
    <ModuleContext.Provider value={{ modules, updateModuleCompletion }}>
      {children}
    </ModuleContext.Provider>
  );
}

export function useModules() {
  const context = useContext(ModuleContext);
  if (!context) {
    throw new Error('useModules must be used within ModuleProvider');
  }
  return context;
}