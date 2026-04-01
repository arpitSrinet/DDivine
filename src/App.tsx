/**
 * @file App.tsx
 * @description Application entry that renders the routed Phase 6 application shell.
 * @module src/App
 */
import { RouterProvider } from 'react-router-dom';

import { router } from '@/router';

export const App = () => <RouterProvider router={router} />;
