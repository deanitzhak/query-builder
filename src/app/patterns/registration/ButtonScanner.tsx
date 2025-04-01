// src/app/patterns/registration/ButtonScanner.tsx
import { registerButton, isButtonRegistered } from './buttonRegistry';

/**
 * Scans for button components in the button directory and registers them
 * Uses static require.context calls to find button components
 */
export const scanButtonDirectory = (): void => {
  try {
    console.log('Auto-discovering button components...');
    
    let buttonContext;
    let buttonFiles: string[] = [];
    
    // Use the exact path to the button components
    try {
      buttonContext = require.context(
        '../../components/button/',
        false,
        /\.tsx$/  // Match any .tsx file in the directory
      );
      buttonFiles = buttonContext.keys();
      console.log(`Found ${buttonFiles.length} button files in components/button directory:`, buttonFiles);
    } catch (err) {
      console.error('Failed to load button components:', err);
      return;
    }
    
    if (buttonFiles.length === 0) {
      console.warn('No button files found. Check the path and file naming pattern.');
      return;
    }
    
    // Process each button file
    let registerCount = 0;
    for (const path of buttonFiles) {
      try {
        // Import the button component
        const ButtonModule = buttonContext(path);
        
        if (!ButtonModule || !ButtonModule.default) {
          console.warn(`No default export found in ${path}`);
          continue;
        }
        
        const ButtonComponent = ButtonModule.default;
        
        // Map filenames to button types
        let buttonType = '';
        
        // Extract button type from filename using one reliable method
        if (path.includes('addButton')) {
          buttonType = 'button';
        } else if (path.includes('inputButton')) {
          buttonType = 'input';
        } else if (path.includes('dateSelector')) {
          buttonType = 'date';
        }else if (path.includes('dropdownButton')) {
          buttonType = 'dropdown';
        }else if (path.includes('toggleButton')) {
          buttonType = 'toggle';
        }
        else if (path.includes('searchButton')) {
          buttonType = 'search';
        }
        else if (path.includes('clearButton')) {
          buttonType = 'clear';
        }
        else if (path.includes('submitButton')) {
          buttonType = 'submit';
        }
        else {
          // For any other button types, extract from filename
          const match = path.match(/\.\/(\w+)Button\.(tsx|jsx)$/);
          if (match && match[1]) {
            buttonType = match[1].toLowerCase();
          }
        }
        
        if (buttonType) {
          // Skip registration if already registered
          if (isButtonRegistered(buttonType)) {
            console.log(`Button type '${buttonType}' is already registered, skipping auto-discovery registration`);
          } else {
            // Register the button component
            registerButton(buttonType, ButtonComponent);
            console.log(`Auto-discovered button: ${buttonType} from ${path}`);
            registerCount++;
          }
        } else {
          console.warn(`Could not determine button type for ${path}`);
        }
      } catch (err) {
        console.error(`Error processing button file ${path}:`, err);
      }
    }
    
    console.log(`Button discovery complete. Registered ${registerCount} buttons.`);
  } catch (err) {
    console.error('Button auto-discovery failed:', err);
  }
};