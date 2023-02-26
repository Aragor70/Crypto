package uk.mprus.crypto.cryptosystem.xor.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import javax.sql.rowset.serial.SerialBlob;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.security.MessageDigest;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;

import uk.mprus.crypto.cryptosystem.xor.models.XOR;
import uk.mprus.crypto.cryptosystem.xor.repositories.XORRepository;
@Service
public class XORService {

    @Autowired
    XORRepository repository;

    public XOR createNewXOR(XOR guest) {
        return repository.create(guest);
    }
    public XOR updateSingleXOR(long id, XOR guest) {

        XOR isMatch = this.getOneById(id);

        if (isMatch == null) {
            return this.createNewXOR((guest));
        }
        return repository.update(guest);
    }

    public XOR getOneById(long id) {
        return repository.getById(id);
    }
    public List<XOR> getAll() {
        return repository.getAll();
    }
    public XOR deleteSingleXOR(long id) {
        XOR xor = repository.getById(id);
        return repository.deleteOne(xor);
    }

    public XOR transform(MultipartFile imageFile, MultipartFile keyFile) throws Exception {

        ByteArrayInputStream streamImage = new ByteArrayInputStream(imageFile.getBytes());

        BufferedImage inputImage = ImageIO.read(streamImage);

        String key = "";

        if (keyFile != null) {

            ByteArrayInputStream streamKey = new ByteArrayInputStream(keyFile.getBytes());
            key = this.toString(streamKey);
        } else {
            key = this.randomKey(inputImage.getWidth() * inputImage.getHeight() * 24);
        }

        XOR xor = new XOR();

        String outputImagePath = imageFile.getOriginalFilename();

        BufferedImage image = this.EditImage(inputImage, outputImagePath, key);

        xor.setImagePath(outputImagePath);
        xor.setImageBlob(this.getBlob(image));

        this.saveKeyPath(xor, key);

        System.out.println("Transfer has benn completed.");

        return xor;
    }

    public BufferedImage EditImage(BufferedImage inputImage, String outputImageName, String key) {
        try {

            BufferedImage outputImage = new BufferedImage(
                    inputImage.getWidth(), inputImage.getHeight(),
                    BufferedImage.TYPE_INT_RGB
            );

            int poz = 0;

            for (int x = 0; x < inputImage.getWidth(); x++) {
                for (int y = 0; y < inputImage.getHeight(); y++) {

                    int pixel = inputImage.getRGB(x, y);

                    Color color = new Color(pixel, true); // 0 - 255

                    int redInt = color.getRed();
                    int greenInt = color.getGreen();
                    int blueInt = color.getBlue();

                    String blueBin = this.padLeftZeros(Integer.toBinaryString(blueInt), 8);
                    String greenBin = this.padLeftZeros(Integer.toBinaryString(greenInt), 8);
                    String redBin = this.padLeftZeros(Integer.toBinaryString(redInt), 8);

                    String rgbStr = redBin + greenBin + blueBin;

                    String oneKey = key.substring(poz, poz + 24);

                    poz += 24;

                    String encodedBinary = "";

                    for (int i = 0; i < rgbStr.length(); i++) {

                        encodedBinary += this.encodeXOR(rgbStr.charAt(i), oneKey.charAt(i));

                    }

                    int rgb = 0xFF000000 | (Integer.parseInt(encodedBinary.substring(0, 8), 2) << 16) | (Integer.parseInt(encodedBinary.substring(8, 16), 2) << 8) | Integer.parseInt(encodedBinary.substring(16, 24), 2);

                    if (rgb == 0) {
                        outputImage.setRGB( x, y, 0xFF000000 );
                    } else {
                        outputImage.setRGB( x, y, rgb );
                    }
                }
            }

            ImageIO.write(outputImage, "png", new File(outputImageName));

            // Files.copy((Path) outputImage, Paths.get(outputImageName), StandardCopyOption.REPLACE_EXISTING);

            return outputImage;

        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
    public static Blob getBlob(BufferedImage file) throws IOException, SQLException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(file, "png", baos);
        return new SerialBlob(baos.toByteArray());
    }
    public static String toString(ByteArrayInputStream is) {
        int size = is.available();
        char[] theChars = new char[size];
        byte[] bytes    = new byte[size];

        is.read(bytes, 0, size);
        for (int i = 0; i < size;)
            theChars[i] = (char)(bytes[i++]&0xff);

        return new String(theChars);
    }

    public void saveKeyPath(XOR xor, String key) {
        try {
            String keyFilePath = "keyFile.txt";
            FileWriter myWriter = new FileWriter(keyFilePath);
            myWriter.write(key);
            myWriter.close();
            xor.setKey(key);

        } catch (IOException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
    }
    public String padLeftZeros(String inputString, int length) {

        if (inputString.length() >= length) {
            return inputString;
        }
        StringBuilder sb = new StringBuilder();
        while (sb.length() < length - inputString.length()) {
            sb.append('0');
        }
        sb.append(inputString);

        return sb.toString();
    }
    public String encodeXOR(char inputString, char key) {

        if (inputString == key) {
            return "0";
        } else {
            return "1";
        }
    }

    public String randomKey(int maxLength) throws Exception {

        StringBuilder str = new StringBuilder();

        if (true) {

            for(int i = 0; i < maxLength; i++) {
                str.append(Math.round( Math.random() ));
            }

            return str.toString();
        }

        String hash = this.getHash("password");

        String hashBinary = this.getBinary(hash);

        int rounds = (maxLength / hashBinary.length());

        for(int i = 0; i < rounds; i++) {
            str.append(hashBinary);
        }

        if (maxLength > str.length()) {
            str.append(hashBinary.substring(0, maxLength - str.length()));
        }

        System.out.println(str.length());

        return str.toString();
    }

    public String getHash(String str) throws Exception {

        MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
        messageDigest.update(str.getBytes());
        String stringHash = new String(messageDigest.digest());

        return stringHash;
    }
    public String getBinary(String s) {

        byte[] bytes = s.getBytes();
        StringBuilder binary = new StringBuilder();
        for (byte b : bytes)
        {
            int val = b;
            for (int i = 0; i < 8; i++)
            {
                binary.append((val & 128) == 0 ? 0 : 1);
                val <<= 1;
            }
        }
        return binary.toString();
    }
}
