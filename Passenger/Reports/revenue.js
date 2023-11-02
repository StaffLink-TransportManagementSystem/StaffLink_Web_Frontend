const ctx2 = document.getElementById('chart2').getContext('2d');
const chart2 = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY'],
        datasets: [{
          label: 'payment in Rupees',
          data: [3000, 3500, 2000, 1500, 4000],
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
