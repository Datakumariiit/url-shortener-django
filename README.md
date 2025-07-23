
## Features Implemented:

* **Custom Short URL Generation**:
    * Input a long URL from the user.
    * Generates a unique 6-character short code (e.g., `/abc123`).
    * Stores long URL and short code mapping in the database.
* **Redirection Handling**:
    * Redirects to the original URL when a short URL is accessed.
* **Frontend Interface**:
    * Clean and responsive form to enter and submit long URLs.
    * Displays the generated short URL after submission.
    * Uses HTML/CSS for styling.
    * Uses JavaScript for dynamic feedback and API calls.
* **Django Admin Panel**:
    * View all URL mappings.
    * Shows: Long URL, Short Code, Date Created, and Click Count.
* **Copy-to-clipboard feature**: Added for the generated short URL.
* **URL usage analytics**: Basic click count tracking implemented.

## Setup Instructions:

1.  **Clone the repository:**
    ```bash
    git clone -----
    cd url_shortener_project
    ```

2.  **Create a virtual environment (recommended):**
    ```bash
    python -m venv venv
    source venv/bin/activate # On Windows: `venv\Scripts\activate`
    ```

3.  **Install dependencies:**
    ```bash
    pip install Django
    ```

4.  **Apply database migrations:**
    ```bash
    python manage.py makemigrations shortener
    python manage.py migrate
    ```

5.  **Create a superuser to access Django Admin (optional but recommended):**
    ```bash
    python manage.py createsuperuser
    ```
    Follow the prompts to create your superuser account.

6.  **Run the development server:**
    ```bash
    python manage.py runserver
    ```

7.  **Access the application:**
    Open your web browser and go to `http://127.0.0.1:8000/`.

8.  **Access Django Admin:**
    Go to `http://127.0.0.1:8000/admin/` and log in with your superuser credentials.

---