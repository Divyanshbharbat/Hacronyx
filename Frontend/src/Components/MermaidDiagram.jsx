import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

export default function MermaidDiagram({ chart, className = '' }) {
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
    });
  }, []);

  useEffect(() => {
    const renderMermaid = async () => {
      if (!containerRef.current || !chart) return;

      setIsLoading(true);
      setError(null);

      try {
        containerRef.current.innerHTML = '';

        const chartId = `mermaid-${Date.now()}`;
        const div = document.createElement('div');
        div.setAttribute('id', chartId);
        div.className = 'mermaid';
        div.innerHTML = chart;

        containerRef.current.appendChild(div);

        await mermaid.parse(chart); // validate chart
        await mermaid.run({ nodes: [div] }); // render chart

        setIsLoading(false);
      } catch (err) {
        console.error('Mermaid rendering error:', err);
        setError('Diagram rendering failed.');
        setIsLoading(false);
      }
    };

    renderMermaid();
  }, [chart]);

  return (
    <div className={`position-relative ${className}`}>
      {isLoading && (
        <div className="position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center bg-dark bg-opacity-50 rounded" style={{ zIndex: 10 }}>
          <div className="spinner-border text-light" role="status" />
        </div>
      )}

      {error ? (
        <div className="p-3 border border-danger bg-danger bg-opacity-10 rounded">
          <p className="text-danger mb-0">{error}</p>
        </div>
      ) : (
        <div
          ref={containerRef}
          className="p-3 bg-dark rounded border border-secondary overflow-auto"
          style={{ maxHeight: '400px' }}
        />
      )}
    </div>
  );
}
