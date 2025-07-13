import { ClipboardList, RefreshCw, Award } from 'lucide-react';
import './KanbanBoard.css';

const KanbanBoard = () => {
  return (
    <section id="preview" className="preview">
      <h2 className="section-title slide-in">Interactive Kanban Board</h2>
      <div className="kanban">
        <div className="kanban__column">
          <h3>
            <ClipboardList size={18} /> To Do
          </h3>
          <div className="kanban__card">Redesign homepage layout</div>
          <div className="kanban__card">User research interviews</div>
        </div>
        <div className="kanban__column">
          <h3>
            <RefreshCw size={18} /> In Progress
          </h3>
          <div className="kanban__card">Implement authentication</div>
        </div>
        <div className="kanban__column">
          <h3>
            <Award size={18} /> Done
          </h3>
          <div className="kanban__card">Project setup</div>
        </div>
      </div>
    </section>
  );
};

export default KanbanBoard;
