import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';

const API_URL = 'http://127.0.0.1:4000/api';

async function getAnalyticsData() {
  try {
    const res = await fetch(`${API_URL}/analytics`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default async function AnalyticsPage() {
  const data = await getAnalyticsData();

  return <AnalyticsDashboard data={data} />;
}
