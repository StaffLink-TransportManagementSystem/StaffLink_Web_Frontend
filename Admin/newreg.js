const ctx = document.getElementById('chart1').getContext('2d');
const chart1 = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY'],
        datasets: [
            {
                label: 'Owners',
                data: [13, 11, 8, 15, 10],
                backgroundColor: '#003566',
            },
            {
                label: 'Vehicles',
                data: [11, 15, 7, 17, 10],
                backgroundColor: '#DAA600',
            },
            {
                label: 'Passengers',
                data: [20, 25, 27, 24, 32],
                backgroundColor: '#000',
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
