window.addEventListener('load', () => {
  localStorage.setItem(
    'tasks',
    JSON.stringify([
      { id: '732', name: 'Feat: User Onboarding Flow v2' },
      { id: '793', name: 'Feat: New Dashboard v1' },
      { id: '724', name: 'Feat: Configuration Form v3' },
      { id: '482', name: 'Admin: Run DB migration' },
      { id: '476', name: 'Admin: Remove Old Assets' },
      { id: '391', name: 'Fix: Memory Leak in Server' },
    ])
  );
});

let _tasks: any[] = [];

export async function getTasks(): Promise<typeof _tasks> {
  try {
    _tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  } catch (err) {
    console.log(err);
  }

  return _tasks;
}
