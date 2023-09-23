const ctx2 = document.getElementById('chart2').getContext('2d');
const chart2 = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY'],
        datasets: [{
          label: 'Revenue in Rupees',
          data: [95000, 143000, 127000, 155000, 164000],
          backgroundColor: '#003566',
          borderColor: '#003566',
          borderwidth: 0.5
        }]
      },

      options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: false 
            }
        }
      }
});
