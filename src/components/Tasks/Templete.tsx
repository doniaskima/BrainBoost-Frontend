export const Templete: React.FC<{
    name: string;
    projectId: string;
  }> = ({ name, projectId }) => {
    return (
      <a
        className="templete">
        <span className="wrap-templete"></span>
        <div className="content h-100">
          <div
            className="tag-templete"
            title="Templates are read-only boards for others to copy.">
            Template
          </div>
          <div className="name-templete">
            <h1 className="name">{name}</h1>
          </div>
        </div>
      </a>
    );
  };
  