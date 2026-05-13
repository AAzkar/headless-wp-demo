import * as Icons from 'lucide-react';

export default function IconRenderer({ name, size = 28, className = '' }) {
  const IconComponent = Icons[name];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent size={size} className={className} />;
}