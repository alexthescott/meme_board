from PIL import Image
import os

# Set the input directory containing JPG files
input_dir = '/Users/alexscott/Desktop/birthday/valentines_day_meme_board/memes'

# Set the output directory to save PNG files
output_dir = '/Users/alexscott/Desktop/birthday/valentines_day_meme_board/memes'

# Loop through all files in input directory and convert JPG to PNG
for file_name in os.listdir(input_dir):
    if file_name.endswith('.jpg'):
        # Open the file using Pillow
        input_image = Image.open(os.path.join(input_dir, file_name))

        # Create the filename for the output PNG file
        output_file_name = os.path.splitext(file_name)[0] + ".png"
        output_image_path = os.path.join(output_dir, output_file_name)

        # Save the file as a PNG
        input_image.save(output_image_path, 'PNG')

        # Close the input image
        input_image.close()

