const STORAGE_KEY = 'student-expense-tracker';

export function loadExpenses() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveExpenses(expenses) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    return true;
  } catch {
    return false;
  }
}

export function getSampleExpenses() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');

  return [
    {
      id: crypto.randomUUID(),
      title: 'Campus Cafeteria',
      amount: 250,
      category: 'Food',
      date: `${year}-${month}-05`,
      description: 'Lunch with classmates',
    },
    {
      id: crypto.randomUUID(),
      title: 'Bus Pass',
      amount: 500,
      category: 'Travel',
      date: `${year}-${month}-01`,
      description: 'Monthly transport pass',
    },
    {
      id: crypto.randomUUID(),
      title: 'Textbook',
      amount: 1200,
      category: 'Education',
      date: `${year}-${month}-10`,
      description: 'Engineering mathematics book',
    },
    {
      id: crypto.randomUUID(),
      title: 'Movie Night',
      amount: 350,
      category: 'Entertainment',
      date: `${year}-${month}-15`,
      description: 'Weekend outing',
    },
    {
      id: crypto.randomUUID(),
      title: 'Stationery',
      amount: 180,
      category: 'Shopping',
      date: `${year}-${month}-08`,
      description: 'Notebooks and pens',
    },
  ];
}
