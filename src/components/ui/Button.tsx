@@ .. @@
 import React from 'react';
 import { cn } from '../../utils/cn';
-import { DivideIcon as LucideIcon } from 'lucide-react';
+import { LucideIcon } from 'lucide-react';

 interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ComponentType<{ className?: string }>;