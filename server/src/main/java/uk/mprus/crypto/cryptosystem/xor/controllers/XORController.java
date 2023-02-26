package uk.mprus.crypto.cryptosystem.xor.controllers;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import uk.mprus.crypto.cryptosystem.xor.models.XOR;
import uk.mprus.crypto.cryptosystem.xor.services.XORService;
import org.springframework.core.io.Resource;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/api")
public class XORController {

    @Autowired
    XORService xorService;

    @CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
    @PostMapping("xor")
    public XOR transform(
            @RequestParam("image") MultipartFile image,
            @Nullable @RequestParam("key") MultipartFile key
    ) throws Exception {
        return xorService.transform(image, key);
    }

//    @GetMapping("guests/{id}")
//    public Guest getOneGuest(@PathVariable long id) {
//        return guestService.getOneById(id);
//    }
//
//    @PostMapping("guests")
//    public Guest createGuest(@RequestBody Guest guest) {
//        return guestService.createNewGuest(guest);
//    }
//    @PostMapping("guests/{value}")
//    public Code xor(@PathVariable String value) {
//
//        System.out.println(value);
//        return guestService.xor(value);
//    }
//
//    @PutMapping("guests/{id}")
//    public Guest updateGuest(@PathVariable long id, @RequestBody Guest guest) {
//        return guestService.updateSingleGuest(id, guest);
//    }
//
//    @DeleteMapping("guests/{id}")
//    public Guest deleteSingleGuest(@PathVariable long id) {
//        return guestService.deleteSingleGuest(id);
//    }

}
