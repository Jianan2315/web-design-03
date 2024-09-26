## Features

- **Add New Student**: Adds a new row for a student with a unique ID, teacher, and award status. After adding, a pop-up confirms the addition of the student.
- **Edit Student**: Opens the dropdown content for a student's record in a pop-up, allowing for updates. The user can either update the student's data or cancel the changes.
- **Delete Student**: Removes the student row and its corresponding dropdown textarea, with a confirmation message.
- **Submit Selected Awards**: Submits the selected student awards and shows a confirmation message.
- **Pop-up Messages**: Provides user feedback via pop-up messages for every major action (add, edit, delete, submit).
- **Dynamic Table Updates**: The table updates dynamically based on user actions.

## File Structure

- `table.html`: The main HTML file containing the structure of the webpage and table.
- `style.css`: Contains the styles for the table, pop-up messages, buttons, and other UI elements.
- `table.css`: Specific styles for the table structure and cell formatting.
- `script.js`: Contains all the JavaScript logic to handle table interactions (add, delete, edit, pop-ups, etc.).
- `down.png` and `pencil.png`: Images used for toggling dropdown text areas.

## How to Use

### 1. Add a New Student
- Click the **"Add New Student"** button.
- A new student row will be added to the table with the next available student number.
- A pop-up message will confirm the addition: `Student X Record added successfully`.
- If the addition fails, a pop-up message will show: `Failed to add Student X`.

### 2. Delete a Student
- Click the **"Delete"** button next to the student you want to delete.
- The student row and its corresponding dropdown textarea will be removed.
- A pop-up message will confirm the deletion: `Student X Record deleted successfully`.

### 3. Edit a Student
- Click the **"Edit"** button next to a student to open the dropdown content in a pop-up.
- You can either **"Update"** the student’s data, which will show a confirmation message (`Student X data updated successfully`), or **"Cancel"** the edit to close the pop-up.

### 4. Submit Selected Awards
- Select students by checking the checkboxes.
- Once a student is selected, the **"Submit Selected Awards"** button will be enabled.
- Clicking the button will trigger a confirmation message: `Successful Submission`.

## Pop-Up Messages

Pop-ups are created dynamically to inform users of the status of actions (e.g., student added, deleted, or data updated). These pop-ups include buttons for user interaction (e.g., close, update, cancel).
