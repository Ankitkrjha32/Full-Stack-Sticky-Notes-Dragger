
import { useEffect } from 'react';
import { Toaster as Sonner } from '@sonner/toast';
import { useTheme } from 'next-themes';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle `
  :root {
    --background-light: #fff;
    --foreground-light: #000;
    --background-dark: #333;
    --foreground-dark: #fff;
    --border-light: #ccc;
    --border-dark: #444;
    --shadow-light: rgba(0, 0, 0, 0.1);
    --shadow-dark: rgba(0, 0, 0, 0.5);
    --primary-light: #0070f3;
    --primary-foreground-light: #fff;
    --primary-dark: #0070f3;
    --primary-foreground-dark: #fff;
    --muted-light: #f5f5f5;
    --muted-foreground-light: #666;
    --muted-dark: #444;
    --muted-foreground-dark: #aaa;
  }

  body {
    background-color: var(--background-light);
    color: var(--foreground-light);
  }

  body.dark {
    background-color: var(--background-dark);
    color: var(--foreground-dark);
  }

  .toaster.light .toast {
    background-color: var(--background-light);
    color: var(--foreground-light);
    border-color: var(--border-light);
    box-shadow: 0 4px 6px var(--shadow-light);
  }

  .toaster.light .toast .description {
    color: var(--muted-foreground-light);
  }

  .toaster.light .toast .actionButton {
    background-color: var(--primary-light);
    color: var(--primary-foreground-light);
  }

  .toaster.light .toast .cancelButton {
    background-color: var(--muted-light);
    color: var(--muted-foreground-light);
  }

  .toaster.dark .toast {
    background-color: var(--background-dark);
    color: var(--foreground-dark);
    border-color: var(--border-dark);
    box-shadow: 0 4px 6px var(--shadow-dark);
  }

  .toaster.dark .toast .description {
    color: var(--muted-foreground-dark);
  }

  .toaster.dark .toast .actionButton {
    background-color: var(--primary-dark);
    color: var(--primary-foreground-dark);
  }

  .toaster.dark .toast .cancelButton {
    background-color: var(--muted-dark);
    color: var(--muted-foreground-dark);
  }
`;

const Toaster = ({ ...props }) => {
  const { theme } = useTheme(); // React context hook for theme

  // Update the theme manually if required
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Sonner
      theme={theme || 'light'} // Default to 'light' if theme is undefined
      className={`toaster ${theme === 'dark' ? 'dark' : 'light'}`} // Conditional class based on theme
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
