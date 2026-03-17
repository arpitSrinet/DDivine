/**
 * @file ImageGallery.test.tsx
 * @description Unit tests for the ImageGallery component.
 * @module src/components/ui/ImageGallery/ImageGallery.test
 */
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ImageGallery } from './ImageGallery';

describe('ImageGallery', () => {
  it('renders the provided images', () => {
    render(
      <ImageGallery
        images={[
          {
            id: 'one',
            src: 'https://images.example.com/one.jpg',
            alt: 'Training session one',
            width: 320,
            height: 240,
          },
        ]}
      />,
    );

    expect(screen.getByRole('img', { name: 'Training session one' })).toBeInTheDocument();
  });
});
