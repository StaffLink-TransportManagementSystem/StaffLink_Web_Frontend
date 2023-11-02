const ctx = document.getElementById('chart1').getContext('2d');
const chart1 = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY'],
        datasets: [
            {
                label: 'week 1',
                data: [2, 3, 5, 7, 6],
                backgroundColor: '#cce5ff',
            },
            {
                label: 'week2',
                data: [5, 5, 3, 7, 6],
                backgroundColor: '#ffe8b3',
            },
            {
                label: 'week 3',
                data: [2, 1, 3, 5, 7],
                backgroundColor: '#C0F2D8',
            },
            {
                label: 'week 4',
                data: [6, 6, 6, 4, 1],
                backgroundColor: '#C73385',
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
