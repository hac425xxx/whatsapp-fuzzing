#include <stdio.h>
#include <dlfcn.h>
#include <time.h>
#include <stdlib.h>
#include <unistd.h>

typedef void (*target_func)(char *filename, struct timespec *tp, int boolean, int x);

int main(int argc, char ** argv) {
	char *whatsapp_lib = getenv("WHATSAPPLIB"); ///data/app/com.whatsapp-jGNjjt4b30_iU-zrMmQ2eA==/lib/x86/libwhatsapp/libwhatsapp.so
	struct timespec tp;
	clock_gettime(1, &tp);

    if (argc < 2) {
        printf("no args provided\n");
        return 1;
    }

	void *handle = dlopen(whatsapp_lib, RTLD_LAZY);

	if (NULL == handle) {
		printf("load %s library error\n", whatsapp_lib);
		return 1;
	}

	void *offset_func = dlsym(handle, "Java_com_whatsapp_Mp4Ops_mp4check");

	if (NULL == offset_func) {
		printf("getprocaddress error\n");
		return 1;
	}

	target_func target = (target_func)((unsigned char *)offset_func + 0x45af0);
	printf("target function addr: %x\n", (unsigned int)target);

	target(argv[1], &tp, 1, 0);

	printf("execute p_target_func:%p\n", target);
  	exit(0);

	return 0;
}
