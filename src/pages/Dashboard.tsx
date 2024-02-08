import React, { useState, useEffect } from 'react';

interface Job {
    ID?: number;
    Role: string;
    Company: string;
    Status: string;
    Notes: string;
}

interface JobApplicationFormProps {
    onAdd: (job: Job) => void;
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({ onAdd }) => {
    const [role, setRole] = useState<string>('');
    const [company, setCompany] = useState<string>('');
    const [status, setStatus] = useState<string>('Applied');
    const [notes, setNotes] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Correctly use capitalized properties as defined in Job interface
        onAdd({ Role: role, Company: company, Status: status, Notes: notes });
        setRole('');
        setCompany('');
        setStatus('Applied');
        setNotes('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-5 p-4 border rounded shadow">
            <h2 className="mb-4">Add New Job Application</h2>
            <div className="form-group">
                <label htmlFor="roleInput">Role</label>
                <input
                    type="text"
                    className="form-control"
                    id="roleInput"
                    placeholder="Enter role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="companyInput">Company</label>
                <input
                    type="text"
                    className="form-control"
                    id="companyInput"
                    placeholder="Enter company name"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="statusSelect">Status</label>
                <select
                    className="form-control"
                    id="statusSelect"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="notesTextarea">Notes</label>
                <textarea
                    className="form-control"
                    id="notesTextarea"
                    placeholder="Add any relevant notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                ></textarea>
            </div>
            <button type="submit" className="btn btn-primary btn-lg btn-block">Add Job Application</button>
        </form>

    );
};

const Dashboard: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('http://localhost:8080/jobs');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                let data = await response.json();
                if (!Array.isArray(data)) {
                    data = [data]; // Wrap the object in an array if needed
                }
                setJobs(data);
            } catch (error) {
                console.error("Failed to fetch jobs:", error);
            }
        };

        fetchJobs();
    }, []);

    const addJob = async (job: Job) => {
        try {
            await fetch('http://localhost:8080/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Role: job.Role,
                    Company: job.Company,
                    Status: job.Status,
                    Notes: job.Notes
                }),
            });
            const response = await fetch('http://localhost:8080/jobs');
            const data = await response.json();
            setJobs(data);
        } catch (error) {
            console.error("Failed to add job", error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Job Tracker Dashboard</h1>
            <JobApplicationForm onAdd={addJob} />
            <div className="row">
                {jobs?.map((job, index) => (
                    // Using col-md-6 to make each card take up half the width on medium devices, creating a two-column layout.
                    <div key={job.ID || index} className="col-md-6 mb-4">
                        <div className="card h-100"> {/* h-100 makes the card height 100% of its parent */}
                            <div className="card-body">
                                <h5 className="card-title">{job.Role} at {job.Company}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Status: {job.Status}</h6>
                                <p className="card-text">{job.Notes}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
