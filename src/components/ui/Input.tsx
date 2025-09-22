@@ .. @@
 import React from 'react';
 import { cn } from '../../utils/cn';
-import { DivideIcon as LucideIcon } from 'lucide-react';
+import { LucideIcon } from 'lucide-react';

 interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
   label?: string;
  icon?: React.ComponentType<{ className?: string }>;
 }