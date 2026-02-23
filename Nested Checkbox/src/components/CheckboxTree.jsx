import React, { useState } from 'react';

const initialData = [
  {
    id: 'p1', label: 'p1',
    children: [
      {
        id: 'p1-c1', label: 'p1-c1',
        children: [
          { id: 'p1-c1-c1', label: 'p1-c1-c1' },
          {
            id: 'p1-c1-c2', label: 'p1-c1-c2',
            children: [
              { id: 'p1-c1-c2-c1', label: 'p1-c1-c2-c1' },
              {
                id: 'p1-c1-c2-c2', label: 'p1-c1-c2-c2',
                children: [
                  { id: 'p1-c1-c2-c2-c1', label: 'p1-c1-c2-c2-c1' },
                  { id: 'p1-c1-c2-c2-c2', label: 'p1-c1-c2-c2-c2' },
                ]
              },
              { id: 'p1-c1-c2-c3', label: 'p1-c1-c2-c3' }
            ]
          }
        ]
      },
      { id: 'p1-c2', label: 'p1-c2' },
      { id: 'p1-c3', label: 'p1-c3' }
    ]
  },
  {
    id: 'p2', label: 'p2',
    children: [
      { id: 'p2-c1', label: 'p2-c1' },
      { id: 'p2-c2', label: 'p2-c2' }
    ]
  },
  { id: 'p3', label: 'p3', children: [{ id: 'p3-c1', label: 'p3-c1' }] },
  { id: 'p4', label: 'p4' }
];

const ExactTreeDesign = () => {
  const [selectedIds, setSelectedIds] = useState(new Set());

  
  const handleCheck = (node, isChecked) => {
    const newSelected = new Set(selectedIds);
    const toggle = (n, status) => {
      if (status) newSelected.add(n.id);
      else newSelected.delete(n.id);
      if (n.children) n.children.forEach(child => toggle(child, status));
    };
    toggle(node, isChecked);
    setSelectedIds(newSelected);
  };

  const RenderTree = ({ node, level = 0 }) => (
    <div key={node.id} style={{ marginLeft: `${level * 24}px` }} className="flex flex-col">
      <div className="flex items-center gap-2 py-[1px]">
        <input
          type="checkbox"
          className="w-3.5 h-3.5 cursor-pointer accent-blue-500"
          checked={selectedIds.has(node.id)}
          onChange={(e) => handleCheck(node, e.target.checked)}
        />
        <span className="text-[14px] leading-tight font-sans text-gray-900 select-none">
          {node.label}
        </span>
      </div>
      {node.children && node.children.map(child => (
        <RenderTree key={child.id} node={child} level={1} />
      ))}
    </div>
  );

  return (
    <div className="p-12 bg-white">
      <div className="flex flex-col space-y-0.5">
        {initialData.map((item) => (
          <RenderTree key={item.id} node={item} level={0} />
        ))}
      </div>
    </div>
  );
};

export default ExactTreeDesign;