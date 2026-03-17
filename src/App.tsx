/**
 * @file App.tsx
 * @description Application entry that renders the Phase 4 router provider.
 * @module src/App
 */
import { RouterProvider } from 'react-router-dom';

import { router } from '@/router';

export const App = () => <RouterProvider router={router} />;
