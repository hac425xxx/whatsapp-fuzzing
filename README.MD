Some command

```
export LD_LIBRARY_PATH=/data/app/com.whatsapp-wMSOMeRwydbzJJmi-G1wEw==/lib/x86_64/:/data/lsl
./afl-fuzz -i - -o mp4out -m 5000 -t 3000 -M master  -- ./loader /data/lsl/libwhatsapp.so @@
./afl-fuzz -i - -o mp4out -m 5000 -t 3000 -S s3 -p fast  -- ./loader /data/lsl/libwhatsapp.so @@
```

