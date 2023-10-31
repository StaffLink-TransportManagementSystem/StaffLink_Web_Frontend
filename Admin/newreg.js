const ctx = document.getElementById('chart1').getContext('2d');
const chart1 = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY'],
        datasets: [
            {
                label: 'Owners',
                data: [13, 11, 8, 15, 10],
                backgroundColor: '#cce5ff',
            },
            {
                label: 'Vehicles',
                data: [11, 15, 7, 17, 10],
                backgroundColor: '#ffe8b3',
            },
            {
                label: 'Passengers',
                data: [20, 25, 27, 24, 32],
                backgroundColor: '#C0F2D8',
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
