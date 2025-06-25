// GitHub content loader
function loadGitHubContent(containerId, path) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = '<div style="padding: 20px; text-align: center;"><p>🔄 Loading content from GitHub...</p></div>';
  
  fetch(`https://api.github.com/repos/masumi-network/kodosumi/contents/docs/${path}`)
    .then(response => response.json())
    .then(data => {
      const content = atob(data.content);
      const renderedContent = renderMarkdown(content, path);
      container.innerHTML = `
        <div style="margin-bottom: 20px; padding: 15px; background: #f0f9ff; border-left: 4px solid #16A34A; border-radius: 4px;">
          <p style="margin: 0; color: #065f46;">
            📡 This content is dynamically loaded from the 
            <a href="https://github.com/masumi-network/kodosumi/blob/main/docs/${path}" target="_blank" style="color: #16A34A; text-decoration: underline;">
              Kodosumi GitHub repository
            </a> and updates automatically.
          </p>
        </div>
        <div style="line-height: 1.6; font-family: inherit;">
          ${renderedContent}
        </div>
      `;
    })
    .catch(error => {
      container.innerHTML = '<div style="padding: 20px; color: #dc2626;"><p>Error loading content from GitHub. Please check the repository.</p></div>';
    });
}

function renderMarkdown(markdown, basePath) {
  return markdown
    .replace(/^##### (.*$)/gim, '<h5 style="font-size: 1em; font-weight: bold; margin: 12px 0 6px 0; color: #6b7280;">$1</h5>')
    .replace(/^###### (.*$)/gim, '<h6 style="font-size: 0.9em; font-weight: bold; margin: 10px 0 5px 0; color: #9ca3af;">$1</h6>')
    .replace(/^#### (.*$)/gim, '<h4 style="font-size: 1.1em; font-weight: bold; margin: 14px 0 8px 0; color: #6b7280;">$1</h4>')
    .replace(/^### (.*$)/gim, '<h3 style="font-size: 1.25em; font-weight: bold; margin: 16px 0 10px 0; color: #4b5563;">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 style="font-size: 1.5em; font-weight: bold; margin: 18px 0 12px 0; color: #374151;">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 style="font-size: 2em; font-weight: bold; margin: 20px 0 15px 0; color: #1f2937;">$1</h1>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong style="font-weight: 600;">$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em style="font-style: italic;">$1</em>')
    .replace(/```bash([\s\S]*?)```/gim, '<pre style="background: #1f2937; color: #f9fafb; padding: 15px; border-radius: 6px; overflow-x: auto; margin: 15px 0;"><code>$1</code></pre>')
    .replace(/```([\s\S]*?)```/gim, '<pre style="background: #f3f4f6; color: #374151; padding: 15px; border-radius: 6px; overflow-x: auto; margin: 15px 0;"><code>$1</code></pre>')
    .replace(/`([^`]*)`/gim, '<code style="background: #f3f4f6; color: #dc2626; padding: 2px 4px; border-radius: 3px; font-size: 0.9em;">$1</code>')
    .replace(/!\[([^\]]*)\]\(([^)]*)\)/gim, function(match, alt, src) {
      const absoluteSrc = src.startsWith('http') 
        ? src 
        : `https://raw.githubusercontent.com/masumi-network/kodosumi/main/docs/${src}`;
      return `<img src="${absoluteSrc}" alt="${alt}" style="max-width: 100%; height: auto; border-radius: 8px; margin: 15px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" />`;
    })
    .replace(/\[([^\]]*)\]\(([^)]*)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: #16A34A; text-decoration: underline; font-weight: 500;">$1</a>')
    .replace(/^\- (.*$)/gim, '<li style="margin: 5px 0; padding-left: 5px;">$1</li>')
    .replace(/^\d+\. (.*$)/gim, '<li style="margin: 5px 0; padding-left: 5px;">$1</li>')
    .replace(/\n\n+/gim, '</p><p style="margin: 15px 0; line-height: 1.6;">')
    .replace(/\n/gim, ' ')
    .replace(/^/, '<p style="margin: 15px 0; line-height: 1.6;">')
    .replace(/$/, '</p>');
}