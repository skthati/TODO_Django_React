import React from 'react';

function MyHeader() {
  return (
    <div className="App">
            <div class="container">
                <div class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                <a href="http://localhost:8000" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                    <svg class="bi me-2" width="40" height="32"><use href="#bootstrap"></use></svg>
                    <span class="fs-4">ToDo App</span>
                </a>

                <ul class="nav nav-pills">
                    <li class="nav-item"><a href="http://localhost:8000" class="nav-link active" aria-current="page">Home</a></li>
                    <li class="nav-item"><a href="http://localhost:8000/api/todo/" class="nav-link">API</a></li>
                    <li class="nav-item"><a href="http://localhost:8000/admin/" class="nav-link">API Admin</a></li>
                    <li class="nav-item"><a href="http://localhost:8000/api/todo/" class="nav-link">API</a></li>
                </ul>
                </div>
            </div>
    </div>
  );
}

export default MyHeader;
