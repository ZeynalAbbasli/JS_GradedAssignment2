const jobBoard = document.getElementById('job-board');
const loadMoreButton = document.getElementById('load-more');
let jobIds = [];
let currentJobIndex = 0;
const jobsPerPage = 6;

// Fetch job story IDs from the Hacker News API
async function fetchJobIds() {
    try {
        const response = await fetch('https://hacker-news.firebaseio.com/v0/jobstories.json');
        jobIds = await response.json();
        loadJobs();
    } catch (error) {
        console.error('Error fetching job IDs:', error);
    }
}

// Fetch job details by ID
async function fetchJobDetails(jobId) {
    try {
        const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${jobId}.json`);
        return await response.json();
    } catch (error) {
        console.error(`Error fetching job details for ID ${jobId}:`, error);
        return null;
    }
}

// Load a batch of jobs
async function loadJobs() {
    const jobsToLoad = jobIds.slice(currentJobIndex, currentJobIndex + jobsPerPage);
    const jobPromises = jobsToLoad.map(id => fetchJobDetails(id));
    const jobDetails = await Promise.all(jobPromises);

    // Filter out null jobs in case of fetch errors
    const validJobs = jobDetails.filter(job => job !== null);

    // Display each job on the page
    validJobs.forEach(displayJob);

    currentJobIndex += jobsPerPage;

    // Hide load more button if no more jobs are available
    if (currentJobIndex >= jobIds.length) {
        loadMoreButton.style.display = 'none';
    }
}

// Display a single job on the job board
function displayJob(job) {
    const jobElement = document.createElement('div');
    jobElement.classList.add('job');

    // Job title (clickable if URL exists)
    const jobTitle = document.createElement('p');
    jobTitle.classList.add('job-title');
    if (job.url) {
        const jobLink = document.createElement('a');
        jobLink.href = job.url;
        jobLink.target = '_blank';
        jobLink.textContent = job.title;
        jobTitle.appendChild(jobLink);
    } else {
        jobTitle.textContent = job.title;
    }

    // Poster and date
    const jobMeta = document.createElement('p');
    const poster = job.by || 'Unknown';
    const datePosted = new Date(job.time * 1000).toLocaleDateString(); // Convert UNIX timestamp
    jobMeta.textContent = `Posted by ${poster} on ${datePosted}`;

    jobElement.appendChild(jobTitle);
    jobElement.appendChild(jobMeta);
    jobBoard.appendChild(jobElement);
}

// Event listener for Load More button
loadMoreButton.addEventListener('click', loadJobs);

// Initial load of job IDs
fetchJobIds();