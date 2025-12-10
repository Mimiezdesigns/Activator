

// ==========================================
// PART 1: The Main Chart (Running Versions)
// ==========================================
const ctxMain = document.getElementById('versionChart').getContext('2d');
const ctxMain2 = document.getElementById('versionChart2').getContext('2d');
const mainLabels = ['1.02.32674e', 'VPX-38.07d', '123.RXA-234', '123.RXA-234', '123.RXA-234', '123.RXA-234', '123.RXA-234', 'Others'];
const mainData = [105000, 95000, 85000, 75000, 60000, 50000, 40000, 115000];
const mainBackgrounds = mainLabels.map(() => 120000);

new Chart(ctxMain, {
    type: 'bar',
    data: {
        labels: mainLabels,
        datasets: [
            {
                data: mainBackgrounds,
                backgroundColor: '#eff1f3',
                barThickness: 12,
                borderRadius: 10,
                borderSkipped: false,
                grouped: false,
                order: 1,
                hoverBackgroundColor: '#eff1f3'
            },
            {
                label: 'Versions',
                data: mainData,
                backgroundColor: ['#0f2346', '#122d53', '#194575', '#1e5b96', '#2671b6', '#5ba4ce', '#23cbf0', '#d1d5db'],
                barThickness: 12,
                borderRadius: 10,
                borderSkipped: false,
                grouped: false,
                order: 0
            }
        ]
    },
    options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#ffffff',
                titleColor: '#6b7280',
                bodyColor: '#1f2937',
                bodyFont: { size: 14, weight: 'bold' },
                borderColor: '#e5e7eb',
                borderWidth: 1,
                padding: 12,
                displayColors: false,
                caretSize: 6,
                cornerRadius: 8,
                callbacks: {
                    label: function (context) { return context.parsed.x.toLocaleString(); }
                }
            }
        },
        scales: {
            x: {
                min: 0, max: 120000,
                grid: { display: false, drawBorder: false },
                border: { display: true, color: '#e5e7eb' },
                ticks: {
                    color: '#6b7280',
                    font: { size: 11 },
                    callback: function (v) { return v === 0 ? '0' : (v / 1000) + 'k'; }
                }
            },
            y: {
                grid: { display: false, drawBorder: false },
                border: { display: false },
                ticks: { color: '#6b7280', font: { size: 12 }, padding: 15 }
            }
        }
    }
});

new Chart(ctxMain2, {
    type: 'bar',
    data: {
        labels: mainLabels,
        datasets: [
            {
                data: mainBackgrounds,
                backgroundColor: '#eff1f3',
                barThickness: 12,
                borderRadius: 10,
                borderSkipped: false,
                grouped: false,
                order: 1,
                hoverBackgroundColor: '#eff1f3'
            },
            {
                label: 'Versions',
                data: mainData,
                backgroundColor: ['#0f2346', '#122d53', '#194575', '#1e5b96', '#2671b6', '#5ba4ce', '#23cbf0', '#d1d5db'],
                barThickness: 12,
                borderRadius: 10,
                borderSkipped: false,
                grouped: false,
                order: 0
            }
        ]
    },
    options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#ffffff',
                titleColor: '#6b7280',
                bodyColor: '#1f2937',
                bodyFont: { size: 14, weight: 'bold' },
                borderColor: '#e5e7eb',
                borderWidth: 1,
                padding: 12,
                displayColors: false,
                caretSize: 6,
                cornerRadius: 8,
                callbacks: {
                    label: function (context) { return context.parsed.x.toLocaleString(); }
                }
            }
        },
        scales: {
            x: {
                min: 0, max: 120000,
                grid: { display: false, drawBorder: false },
                border: { display: true, color: '#e5e7eb' },
                ticks: {
                    color: '#6b7280',
                    font: { size: 11 },
                    callback: function (v) { return v === 0 ? '0' : (v / 1000) + 'k'; }
                }
            },
            y: {
                grid: { display: false, drawBorder: false },
                border: { display: false },
                ticks: { color: '#6b7280', font: { size: 12 }, padding: 15 }
            }
        }
    }
});

// ==========================================
// PART 2: The Active Jobs List (Stacked Bars)
// ==========================================

// Configuration Constants
const JOB_COUNT = 6;
const JOB_NAMES = ["WeOS 5.16 Upgrade", "Switch Firmware Patch", "Router Config Update", "Security Protocol v2", "Legacy System Wipe", "Data Sync Job"];

// Colors
const C_SUCCESS = '#10B981'; // Emerald
const C_FAILED = '#EF4444';  // Red
const C_AVAIL = '#1E40AF';   // Deep Blue
const C_RUNNING = '#94A3B8'; // Slate Grey
const borderRadiusValue = "10px";

// Helper: Generate Random Data
function generateJobData() {
    const success = Math.floor(Math.random() * 800) + 100;
    const failed = Math.floor(Math.random() * 100);
    const available = Math.floor(Math.random() * 100);
    const running = Math.floor(Math.random() * 200);
    return {
        success, failed, available, running,
        total: success + failed + available + running
    };
}

const container = document.getElementById('jobsContainer');

// Loop to create items
for (let i = 0; i < JOB_COUNT; i++) {
    const data = generateJobData();
    const jobName = JOB_NAMES[i] || "Unknown Job";
    // const canvasId = jobChart_${i};
    const canvasId = `jobChart${i}`;


    // 1. Build HTML Structure
    const itemHTML = `
                <div class="job-item">
                    <div class="job-header">
                        <span class="job-name">${jobName}</span>
                        <span class="job-total">${data.total} Devices</span>
                    </div>
                    
                    <!-- Wrapper with specific height for tooltip breathing room -->
                  <div class="job-chart-wrapper">
    <canvas class="chart-canvas" id="${canvasId}"> </canvas> 
</div>

                    <div class="job-legend">
                        <div class="legend-item">
                            <span class="legend-dot" style="background-color: ${C_SUCCESS}"></span>
                            ${data.success}
                        </div>
                        <div class="legend-item">
                            <span class="legend-dot" style="background-color: ${C_FAILED}"></span>
                            ${data.failed}
                        </div>
                        <div class="legend-item">
                            <span class="legend-dot" style="background-color: ${C_AVAIL}"></span>
                            ${data.available}
                        </div>
                        <div class="legend-item">
                            <span class="legend-dot" style="background-color: ${C_RUNNING}"></span>
                            ${data.running}
                        </div>
                    </div>
                </div>
            `;

    // Append to container
    container.insertAdjacentHTML('beforeend', itemHTML);

    // 2. Initialize Chart for this item
    const ctxJob = document.getElementById(canvasId).getContext('2d');

    new Chart(ctxJob, {
        type: 'bar',
        data: {
            labels: ['Status'], // Single row
            datasets: [
                {
                    label: 'Success',
                    data: [data.success],
                    backgroundColor: C_SUCCESS,
                    // Round Left side only
                    borderRadius: { topLeft: 10, bottomLeft: 10 },
                    borderSkipped: false, // Ensures rounding happens
                },
                {
                    label: 'Failed',
                    data: [data.failed],
                    backgroundColor: C_FAILED,
                    borderRadius: 0
                },
                {
                    label: 'Available',
                    data: [data.available],
                    backgroundColor: C_AVAIL,
                    borderRadius: 0
                },
                {
                    label: 'Running',
                    data: [data.running],
                    backgroundColor: C_RUNNING,
                    // Round Right side only
                    borderRadius: { topRight: 10, bottomRight: 10 },
                    borderSkipped: false
                }
            ]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false, // Allows canvas height > bar thickness
            scales: {
                x: { display: false, stacked: true },
                y: { display: false, stacked: true }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#ffffff',
                    titleColor: '#6b7280',
                    bodyColor: '#1f2937',
                    borderColor: '#e5e7eb',
                    borderWidth: 1,
                    padding: 10,
                    displayColors: true,
                    boxPadding: 4,
                    usePointStyle: true,
                    callbacks: {
                        title: () => null, // Hide title
                        label: function (context) {
                            // return ${context.dataset.label}: ${context.raw} Devices;
                            return `${context.dataset.label}: ${context.parsed.x}`;

                        }
                    }
                }
            },
            layout: {
                padding: {
                    // Helps prevent clipping of shadows/tooltips
                    top: 10,
                    bottom: 10
                }
            },
            // Bar Thickness Logic
            barThickness: 10,
        }
    });
}