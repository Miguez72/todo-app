# Web App Specifications

## Technologies:
- Use **ReactJS** with **TypeScript**
- Use **Sass** for CSS preprocessing
- Prefer **Material UI** as the UI framework

## Design & Layout:
- Follow the visual design provided in the XD file (desktop version)
- The layout must be fully **responsive**
  - You are free to reposition or rework elements for smaller screens (down to 320px)

## Data Source:
- Use this GET endpoint to fetch the data for the "Todos" table:
  - https://jsonplaceholder.typicode.com/todos

## Left Panel - Filters (All filters work together using AND logic):
1. **Text Input**:
   - Filters by `title`
   - Triggers on **Enter key**
2. **Toggle Switch**:
   - Filters for **completed** status
   - Applies the filter immediately on change
3. **UserID Dropdown**:
   - Multi-select dropdown
   - Filters by `userId`
   - Applies filter on every selection/deselection
4. **Reset Button**:
   - Resets all filters

## Right Panel - Todos List:
- Display the list of todos with **pagination**

## Create/Edit Panel:
- Implement a UI for **creating and editing todos**
- This view is **not included** in the design file, but must match the overall style of the application
