export async function getLandingStats() {
  'use cache';

  return [
    { label: 'Active Cohorts', value: '12+' },
    { label: 'Students Managed', value: '2.5k+' },
    { label: 'Assignments Reviewed', value: '18k+' },
  ];
}
