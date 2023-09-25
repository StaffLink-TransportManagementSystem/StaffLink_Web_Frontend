const ctx = document.getElementById('chart1').getContext('2d');
const chart1 = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY'],
        datasets: [
            {
                label: 'Passengers',
                data: [20, 25, 27, 24, 32],
                backgroundColor: '#003566',
            }
        ]
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
