// src/components/RepoList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RepoList() {
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        // Fetch repositories from the backend
        axios.get('/api/repos').then((response) => setRepos(response.data));
    }, []);

    const toggleAutoReview = async (repoId) => {
        // Toggle the Auto Review setting for a specific repository
        await axios.post(`/api/repos/${repoId}/toggle`);
        // Update the state to reflect the change
        setRepos(repos.map(repo => 
            repo.id === repoId ? { ...repo, autoReview: !repo.autoReview } : repo
        ));
    };

    return (
        <div>
            {repos.map((repo) => (
                <div key={repo.id}>
                    <p>{repo.name}</p>
                    <label>
                        Auto Review
                        <input
                            type="checkbox"
                            checked={repo.autoReview}
                            onChange={() => toggleAutoReview(repo.id)}
                        />
                    </label>
                </div>
            ))}
        </div>
    );
}

export default RepoList;
