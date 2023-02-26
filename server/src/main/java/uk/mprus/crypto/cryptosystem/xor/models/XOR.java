package uk.mprus.crypto.cryptosystem.xor.models;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Blob;

public class XOR {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    public String keyFilePath;

    public String imagePath;

    public Blob imageBlob;
    public String key;
    public XOR() {}

    public long getId() {
        return this.id;
    }
    public String getKey() {
        return this.key;
    }
    public String getImagePath() {
        return this.imagePath;
    }
    public void setKeyFilePath(String path) {
        this.keyFilePath = path;
    }
    public void setKey(String key) {
        this.key = key;
    }
    public void setImagePath(String path) {
        this.imagePath = path;
    }
    public void setImageBlob(Blob blobFile) {
        this.imageBlob = blobFile;
    }

}